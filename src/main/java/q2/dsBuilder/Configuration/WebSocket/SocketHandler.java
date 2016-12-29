package q2.dsBuilder.Configuration.WebSocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.jni.Local;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import q2.dsBuilder.LocalVariable;

import q2.dsBuilder.DatabaseConfiguration.CoreConnection;

@Component
public class SocketHandler extends TextWebSocketHandler {
	
	private static List<WebSocketSession> sessions = new ArrayList<>();
	public Map<String,String> connectionObject;
	public CoreConnection coreConnection;

	public Map<String, String> getConnectionObject() {
		return connectionObject;
	}


	public void setConnectionObject(Map<String, String> connectionObject) {
		this.connectionObject = connectionObject;
	}


	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		//the messages will be broadcasted to all users.		
		sessions.add(session);		
	}
	
	
	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message)
	throws Exception {		
		for(WebSocketSession webSocketSession : sessions) {
			this.setConnectionObject(new Gson().fromJson(message.getPayload(), Map.class));
			//webSocketSession.sendMessage(new TextMessage("Hellow " + connectionObject.get("name")));			
		}
	}
	
	public void checkConnection(Map<String,String> connObject){		
		System.out.println("jumlah sessionnya ada :" + sessions.size());
		if(sessions.size() > 0){
			try {				
				for (WebSocketSession session : sessions) {					
					//session.sendMessage(new TextMessage(Message));
					//session.sendMessage(new TextMessage(connObject.get("name")));					
					String serverName = connectionObject.get("serverName");//"localhost";
					String userName = connectionObject.get("userName"); //sa";
					String pass=connectionObject.get("pass");//"123456";
					String dbType = LocalVariable.PARAM_DB_TYPE;
					System.out.println("server name is : " + serverName);
					coreConnection = new CoreConnection(serverName, userName, pass, 0, dbType);
					System.out.println("apakah konek? " + coreConnection.isConnectionOpen());
					if(!coreConnection.isConnectionOpen()){
						session.sendMessage(new TextMessage("Could not connect server " + connObject.get("serverName")));
					}else{
						session.sendMessage(new TextMessage("Connected to server " + connObject.get("serverName")));
					}
				}
			} catch (Exception e) {				
				// TODO: handle exception
				System.err.println("ada error tuh!");
				e.printStackTrace();
			}
		}
		else{
			System.out.println("no session running ....");
		}
	}			
}