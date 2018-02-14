package utils.request.decorators.impl;

import utils.request.RequestBody;
import utils.request.decorators.RequestBodyDecorator;

public class ResquestBodyJSONMessageDecorator extends RequestBodyDecorator {
    public ResquestBodyJSONMessageDecorator(RequestBody requestBody) {
        super(requestBody);
    }

    @Override
    public String getBody() {
        return "{\"msg\":\"" +
                super.getBody() +
                "\"}";
    }
}
