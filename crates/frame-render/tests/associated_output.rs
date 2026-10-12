use frame_render::{demultiplied, demultiplied_checked};
#[test]
fn straight_output_rejects_emission_but_ordinary_output_is_unchanged() {
    for data in [[120, 0, 0, 0], [200, 180, 160, 64]] {
        assert_eq!(demultiplied_checked(&data).unwrap_err(), "EMISSIVE_STRAIGHT_ALPHA_UNSUPPORTED");
    }
    for data in [[0, 0, 0, 0], [40, 20, 5, 64], [200, 180, 160, 255]] {
        assert_eq!(demultiplied_checked(&data).unwrap(), demultiplied(&data));
    }
}
