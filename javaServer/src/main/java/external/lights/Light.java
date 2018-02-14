package external.lights;

import application.model.ConnectionInfo;
import application.requests.RequestsHandler;
import external.lights.states.LightState;
import utils.request.PlainRequestBody;
import utils.request.decorators.impl.ResquestBodyJSONMessageDecorator;

public class Light {
    private LightState lightState;
    private String lightName;

    public String getLightName() {
        return lightName;
    }

    public void setLightName(String lightName) {
        this.lightName = lightName;
    }

    public LightState getLightState() {
        return lightState;
    }

    public void setLightState(LightState lightState) {
        this.lightState = lightState;
    }

    public void toggle() {
        lightState.toggle(this);
        RequestsHandler.safePOST(ConnectionInfo.getSpeakerIP(),
                new ResquestBodyJSONMessageDecorator(new PlainRequestBody(
                        lightName + " light is now " + lightState.tts()
                )).getBody(),
                ConnectionInfo.getContentType());
    }
}
