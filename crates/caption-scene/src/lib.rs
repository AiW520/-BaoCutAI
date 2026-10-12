//! Dynamic caption contracts shared by persistence, native rendering and WASM.
//! No filesystem, system clock, UI or platform dependencies.
mod expression;
mod model;
mod validate;
pub use expression::*;
pub use model::*;
pub use validate::*;

pub const STYLE_SCHEMA: &str = "baocut.caption-scene-style/1";
pub const SCENE_SCHEMA: &str = "baocut.caption-scene/1";
pub const MAX_NODES: usize = 256;
pub const MAX_UNITS: usize = 4096;
pub const MAX_OPERATIONS: usize = 65536;

#[derive(Clone, Debug, PartialEq, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Diagnostic {
    pub code: String,
    pub path: String,
    pub detail: String,
}
impl Diagnostic {
    pub fn new(code: &str, path: impl Into<String>, detail: impl Into<String>) -> Self {
        Self {
            code: code.into(),
            path: path.into(),
            detail: detail.into(),
        }
    }
}
impl std::fmt::Display for Diagnostic {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{} at {}: {}", self.code, self.path, self.detail)
    }
}
impl std::error::Error for Diagnostic {}
pub type Result<T> = std::result::Result<T, Diagnostic>;
pub(crate) fn invalid(path: impl Into<String>, detail: impl Into<String>) -> Diagnostic {
    Diagnostic::new("CAPTION_SCENE_INVALID", path, detail)
}
