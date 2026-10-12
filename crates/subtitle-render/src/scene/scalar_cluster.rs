//! Parameterized two-pass scalar grouping for pagination counts, not glyph shaping.
use super::*;

pub(super) const MAX_CLUSTER_OPERATIONS: usize = 1_048_576;
pub(super) struct ClusterBudget {
    remaining: usize,
}
impl ClusterBudget {
    pub(super) fn new(limit: usize) -> Self {
        Self { remaining: limit }
    }
    fn spend(&mut self) -> Result<()> {
        self.remaining = self
            .remaining
            .checked_sub(1)
            .ok_or_else(|| anyhow::anyhow!("CAPTION_BUDGET_EXCEEDED: scalar cluster operations"))?;
        Ok(())
    }
}
fn contains(scalar: u32, ranges: &[[u32; 2]], budget: &mut ClusterBudget) -> Result<bool> {
    for &[low, high] in ranges {
        budget.spend()?;
        if low <= scalar && scalar <= high {
            return Ok(true);
        }
    }
    Ok(false)
}
fn attaches(
    next: u32,
    previous: u32,
    head: u32,
    rules: &ScalarClusterRules,
    budget: &mut ClusterBudget,
) -> Result<bool> {
    for rule in &rules.attachments {
        budget.spend()?;
        if !contains(next, &rule.next, budget)? {
            continue;
        }
        if let Some(ranges) = &rule.previous {
            if !contains(previous, ranges, budget)? {
                continue;
            }
        }
        if let Some(ranges) = &rule.head_excluded {
            if contains(head, ranges, budget)? {
                continue;
            }
        }
        return Ok(true);
    }
    Ok(false)
}
fn joiner(scalar: u32, rules: &ScalarClusterRules, budget: &mut ClusterBudget) -> Result<bool> {
    for candidate in &rules.joiners {
        budget.spend()?;
        if scalar == *candidate {
            return Ok(true);
        }
    }
    Ok(false)
}
pub(super) fn count(
    text: &str,
    rules: &ScalarClusterRules,
    budget: &mut ClusterBudget,
) -> Result<usize> {
    let mut scalars = Vec::new();
    for scalar in text.chars() {
        budget.spend()?;
        scalars.push(scalar as u32);
    }
    // Only singleton identity is needed by the second pass; no rendered cluster
    // or replacement source text is created by this counting operation.
    let mut groups = Vec::new();
    let mut at = 0;
    while at < scalars.len() {
        budget.spend()?;
        let head = scalars[at];
        let mut previous = head;
        let mut length = 1;
        at += 1;
        while at < scalars.len() && attaches(scalars[at], previous, head, rules, budget)? {
            budget.spend()?;
            previous = scalars[at];
            length += 1;
            at += 1;
        }
        if at < scalars.len() && contains(previous, &rules.consume_following_after, budget)? {
            budget.spend()?;
            length += 1;
            at += 1;
        }
        groups.push(if length == 1 { Some(head) } else { None });
    }
    let mut result = 0;
    let mut index = 0;
    while index < groups.len() {
        budget.spend()?;
        result += 1;
        index += 1;
        while index + 1 < groups.len() {
            budget.spend()?;
            let Some(scalar) = groups[index] else { break };
            if !joiner(scalar, rules, budget)? {
                break;
            }
            budget.spend()?;
            index += 2;
        }
    }
    Ok(result)
}

#[cfg(test)]
mod tests {
    use super::*;
    fn rules(value: serde_json::Value) -> ScalarClusterRules {
        serde_json::from_value(value).unwrap()
    }
    fn counted(text: &str, rules: &ScalarClusterRules) -> usize {
        count(text, rules, &mut ClusterBudget::new(MAX_CLUSTER_OPERATIONS)).unwrap()
    }
    #[test]
    fn scalar_cluster_empty_rules_are_scalar_identity() {
        let empty = ScalarClusterRules::default();
        for text in ["", "abc", "e\u{301}", "👩‍👩‍👧‍👦", "\u{10ffff}"] {
            assert_eq!(counted(text, &empty), text.chars().count());
        }
    }
    #[test]
    fn scalar_cluster_attachments_use_current_previous_and_fixed_head() {
        let previous =
            rules(serde_json::json!({"attachments":[{"next":[[33,33]],"previous":[[65,90]]}]}));
        assert_eq!(counted("A!!", &previous), 2); // previous becomes ! after the first attachment.
        assert_eq!(counted("AB!", &previous), 2);
        let head = rules(
            serde_json::json!({"attachments":[{"next":[[126,126]],"headExcluded":[[65,65]]}]}),
        );
        assert_eq!(counted("A~~", &head), 2);
        assert_eq!(counted("B~~", &head), 1);
    }
    #[test]
    fn scalar_cluster_consumes_only_one_following_scalar_without_restarting_attachments() {
        let one = rules(serde_json::json!({"consumeFollowingAfter":[[46,46],[97,97]]}));
        assert_eq!(counted(".ab", &one), 2); // The consumed a cannot cause a second consume.
        let no_restart = rules(
            serde_json::json!({"attachments":[{"next":[[126,126]]}],"consumeFollowingAfter":[[46,46]]}),
        );
        assert_eq!(counted(".a~", &no_restart), 2);
        assert_eq!(counted("a~", &no_restart), 1);
    }
    #[test]
    fn scalar_cluster_second_pass_only_joins_standalone_groups_with_a_following_group() {
        let plain = rules(serde_json::json!({"joiners":[43]}));
        for (text, expected) in [("A+B+C", 1), ("A+", 2), ("+A", 2), ("A++B", 2)] {
            assert_eq!(counted(text, &plain), expected, "{text}");
        }
        let attached =
            rules(serde_json::json!({"attachments":[{"next":[[126,126]]}],"joiners":[43]}));
        assert_eq!(
            counted("A+~B", &attached),
            3,
            "multi-scalar +~ is not a standalone joiner"
        );
        let consumed = rules(serde_json::json!({"consumeFollowingAfter":[[43,43]],"joiners":[43]}));
        assert_eq!(
            counted("A+B", &consumed),
            2,
            "+B cannot join the preceding group"
        );
    }
    #[test]
    fn scalar_cluster_budget_is_cumulative_across_words() {
        let rules = ScalarClusterRules::default();
        let mut budget = ClusterBudget::new(5);
        assert_eq!(count("x", &rules, &mut budget).unwrap(), 1);
        assert!(
            count("y", &rules, &mut budget)
                .unwrap_err()
                .to_string()
                .contains("CAPTION_BUDGET_EXCEEDED")
        );
    }

    #[test]
    fn scalar_cluster_range_order_keeps_short_circuit_work_without_sorting() {
        let late = rules(serde_json::json!({"attachments":[{"next":[[255,255],[126,126]]}]}));
        let early = rules(serde_json::json!({"attachments":[{"next":[[126,126],[255,255]]}]}));
        assert_eq!(counted("A~", &late), 1);
        assert_eq!(counted("A~", &early), 1);
        assert!(count("A~", &late, &mut ClusterBudget::new(7)).is_err());
        assert_eq!(count("A~", &early, &mut ClusterBudget::new(7)).unwrap(), 1);
    }
}
