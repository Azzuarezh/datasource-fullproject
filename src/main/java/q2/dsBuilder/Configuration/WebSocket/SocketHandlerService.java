package q2.dsBuilder.Configuration.WebSocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class SocketHandlerService {

	@Autowired SocketHandler socketHandler;
	
	@Scheduled(fixedDelay=3000)
	public void postIt(){
		//System.out.println(socketHandler.connectionObject);
		socketHandler.checkConnection(socketHandler.connectionObject);
	}
}
