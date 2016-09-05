package q2.dsBuilder;

public class LocalVariable {
	
	public static final String SQL_SERVER_DB ="SQLServer";
	public static final String POSTGRESQL_DB ="PostgreSQL";
	
	public static final String SQL_SERVER_DRIVERCLASS= "com.microsoft.sqlserver.jdbc.SQLServerDriver";
	public static final String POSTGRESQL_DRIVERCLASS= "org.postgresql.Driver";
	
	public static final String DEFAULT_DB = SQL_SERVER_DB;
	
	/*global variable*/
	public static final String PARAM_DB_TYPE = "DB_Type";
	public static final String PARAM_DB_NAME = "DB_Name";
	public static final String PARAM_TBL_NAME = "TBL_Name";
	public static final String PARAM_OBJECT_TYPE = "ObjectType";
	public static final String PARAM_OBJECT_TABLE ="TABLE";
	public static final String PARAM_OBJECT_VIEW ="VIEW";
	

}
