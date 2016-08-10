package q2.dsBuilder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class DsBuilderServersideApplication {

	public static void main(String[] args) {
		SpringApplication.run(DsBuilderServersideApplication.class, args);
	}
}
