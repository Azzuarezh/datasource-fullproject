package q2.dsBuilder;

import javax.sql.DataSource;

import org.springframework.jdbc.datasource.DriverManagerDataSource;

public class Driver {

	private DriverManagerDataSource driverManagerDataSource;
	private DataSource dataSource;
	
	public Driver(String serverName, String username, String password, String DBType, int port){
		DriverManagerDataSource dsm = new DriverManagerDataSource();
		dsm.setUsername(username);
		dsm.setPassword(password);
		switch (DBType) {
		case LocalVariable.SQL_SERVER_DB:
			dsm.setDriverClassName(LocalVariable.SQL_SERVER_DRIVERCLASS);
			dsm.setUrl(String.format("jdbc:sqlserver://%s:%d;databaseName=master", serverName, port==0?1433:port));			
			break;
		case LocalVariable.POSTGRESQL_DB:
			dsm.setDriverClassName(LocalVariable.POSTGRESQL_DRIVERCLASS);
			dsm.setUrl(String.format("jdbc:postgresql://%s:%d/Cronos?tcpKeepAlive=true&autoReconnect=true", serverName, port==0?5432:port));			
			break;

		default:
			break;
		}
		this.dataSource = dsm;
	}
	
	public DataSource getDataSource() {
		return dataSource;
	}
}
