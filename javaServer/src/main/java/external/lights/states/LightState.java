package external.lights.states;

import external.lights.Light;
import javafx.scene.control.Button;

public abstract class LightState {
    protected Button btn;

    public LightState(Button btn) {
        this.btn = btn;
    }

    public Button getBtn() {
        return btn;
    }

    public void setBtn(Button btn) {
        this.btn = btn;
    }

    abstract public void toggle(Light light);
    abstract public String tts();
}
