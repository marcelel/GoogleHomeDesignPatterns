package application.fx;

import application.api.controller.LightsController;
import application.model.ConnectionInfo;
import application.model.LightStatus;
import application.requests.RequestsHandler;
import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import utils.request.PlainRequestBody;
import utils.request.decorators.impl.ResquestBodyJSONMessageDecorator;

public class MainApp extends Application {

    public static void main(String[] args) {
        new LightsController();
        launch(args);
    }

    public void start(Stage primaryStage) {
        primaryStage.setTitle("Control Panel");

        StackPane root = new StackPane();

        VBox content = new VBox();

        content.setAlignment(Pos.CENTER);
        content.setSpacing(10);
        content.setPadding(new Insets(10, 10, 10, 10));

        Label inputIP = new Label("Enter server address:");
        TextField speakerIPTextField = new TextField();
        speakerIPTextField.setAlignment(Pos.CENTER);
        Label setConfirmation = new Label("Server address has been set");
        setConfirmation.setVisible(false);
        Button setIP = new Button();
        setIP.setText("confirm server address");
        setIP.setOnAction(event -> {
            ConnectionInfo.setSpeakerIP(speakerIPTextField.getText());
            setConfirmation.setVisible(true);
            new Thread(() -> {
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException ignored) {}
                setConfirmation.setVisible(false);
            }).start();
        });

        content.getChildren().addAll(inputIP, speakerIPTextField, setIP, setConfirmation);

        LightStatus.init(content);

        Button doorbellButton = new Button();
        doorbellButton.setText("toggle doorbell");
        doorbellButton.setOnAction(event ->
                RequestsHandler.safePOST(ConnectionInfo.getSpeakerIP(),
                        new ResquestBodyJSONMessageDecorator(new PlainRequestBody(
                                    "doorbell is ringing"
                            )).getBody(),
                            ConnectionInfo.getContentType()));
        content.getChildren().add(doorbellButton);

        root.getChildren().add(content);

        primaryStage.setScene(new Scene(root, 300, 300));
        primaryStage.show();
    }
}
