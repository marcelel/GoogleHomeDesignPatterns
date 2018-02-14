package external.lights.states.impl;

import external.lights.Light;
import external.lights.states.LightState;
import javafx.scene.control.Button;

public class LightOff extends LightState {
    public LightOff(Button btn) {
        super(btn);
        btn.setStyle("-fx-background-color:#8C8C8C;");
    }

    public void toggle(Light light) {
        light.setLightState(new LightDimmed(btn));
        btn.setStyle("-fx-background-color:#C7B400;");
    }

    public String tts() {
        return "off";
    }
}
