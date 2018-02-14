package utils.request.decorators.impl;

import utils.request.RequestBody;
import utils.request.decorators.RequestBodyDecorator;

public class ResquestBodyXMLMessageDecorator extends RequestBodyDecorator{
    public ResquestBodyXMLMessageDecorator(RequestBody requestBody) {
        super(requestBody);
    }

    @Override
    public String getBody() {
        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                "<root><msg>" +
                super.getBody() +
                "</msg></root>";
    }
}
