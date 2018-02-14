package application.model;

import external.lights.Light;
import external.lights.states.impl.LightOff;
import javafx.scene.control.Button;
import javafx.scene.layout.Pane;

import java.util.ArrayList;

public class LightStatus {
    private static String[] lightsNames = {
            "kitchen",
            "bathroom",
            "living room"
    };
    private static ArrayList<Light> lights;

    private LightStatus() {}

    public static ArrayList<Light> getLightStatus() {
        return lights;
    }

    public static void init(Pane buttonContainer) {
        lights = new ArrayList<>();

        for(String name : lightsNames) {
            final Light light = new Light();
            Button button = new Button();

            button.setText(name);
            button.setOnAction(event -> light.toggle());

            buttonContainer.getChildren().add(button);

            light.setLightState(new LightOff(button));
            light.setLightName(name);
            lights.add(light);
        }
    }
}
