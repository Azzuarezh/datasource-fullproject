package q2.dsBuilder;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.JdbcTemplate;


public class CoreConnection {
	
	public String DB_Type;
	private Driver driver;
	private JdbcTemplate jdbcTemplate;
	public List<Map<String,Object>> Query_Result;
	
	public CoreConnection(String serverName,String userName, String pass, int port,String dB_Type) {		
		DB_Type = dB_Type;
		this.driver = new Driver(serverName, userName, pass, dB_Type, port);
		this.jdbcTemplate = new JdbcTemplate(driver.getDataSource());
		
	}
	
	public Driver getDriver() {
		return driver;
	}
	public void setDriver(Driver driver) {
		this.driver = driver;
	}
	
	public List<Map<String, Object>> getQuery_Result(String sql) throws SQLException{		
		Query_Result = jdbcTemplate.queryForList(sql);
		return Query_Result;
		
	}
			

}
