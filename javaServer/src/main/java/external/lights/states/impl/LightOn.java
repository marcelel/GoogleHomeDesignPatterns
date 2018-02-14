package external.lights.states.impl;

import external.lights.Light;
import external.lights.states.LightState;
import javafx.scene.control.Button;

public class LightOn extends LightState {
    public LightOn(Button btn) {
        super(btn);
        btn.setStyle("-fx-background-color:#FFE600;");
    }

    public void toggle(Light light) {
        light.setLightState(new LightOff(btn));
        btn.setStyle("-fx-background-color:#8C8C8C;");
    }

    public String tts() {
        return "on";
    }
}
