package q2.dsBuilder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.apache.log4j.Logger;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@EnableWebSocket
public class DsBuilderServersideApplication {

	public static void main(String[] args) {
		SpringApplication.run(DsBuilderServersideApplication.class, args);
	}
	
	private static final Logger logger = Logger.getLogger(DsBuilderServersideApplication.class);
}
