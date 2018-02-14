package external.lights.states.impl;

import external.lights.Light;
import external.lights.states.LightState;
import javafx.scene.control.Button;

public class LightDimmed extends LightState {
    public LightDimmed(Button btn) {
        super(btn);
        btn.setStyle("-fx-background-color:#C7B400;");
    }

    public void toggle(Light light) {
        light.setLightState(new LightOn(btn));
        btn.setStyle("-fx-background-color:#FFE600;");
    }

    public String tts() {
        return "dimmed";
    }
}
