package application.api.controller;

import application.model.LightStatus;
import utils.request.PlainRequestBody;
import utils.request.decorators.impl.ResquestBodyJSONMessageDecorator;

import static spark.Spark.get;

public class LightsController {
    public LightsController() {
        get("/lights", (request, response) ->
                new ResquestBodyJSONMessageDecorator(new PlainRequestBody(
                        LightStatus.getLightStatus().stream()
                                .map(light -> light.getLightName() + " " + light.getLightState().tts())
                                .reduce("", (x, y) -> x + ", " + y)
                                .replaceFirst(", ", ""))
                ).getBody());
    }
}
