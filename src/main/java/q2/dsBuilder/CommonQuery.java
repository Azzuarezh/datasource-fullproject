package q2.dsBuilder;

import java.util.List;
import java.util.Map;

public class CommonQuery implements CommonQueryInterface {

	private String query;
	
	@Override
	public String getDatabases(String DBType) {
		// TODO Auto-generated method stub		
		switch (DBType) {
		case LocalVariable.SQL_SERVER_DB:
			query ="select name as DATABASE_NAME from master..sysdatabases where dbid > 6";
			break;
		case LocalVariable.POSTGRESQL_DB:
			query = "select datname as \"DATABASE_NAME\" from pg_database where datistemplate = false";
		default:
			break;
		}		
		return query;
	}

	

	@Override
	public String getColumnsFromTable(String DBType, String DbName, String TblName) {
		// TODO Auto-generated method stub
		switch (DBType) {
		case LocalVariable.SQL_SERVER_DB:
			query  = String.format("select TABLE_NAME as , COLUMN_NAME, DATA_TYPE from %s.INFORMATION_SCHEMA.COLUMNS "+
					"where TABLE_NAME = '%s order by COLUMN_NAME asc", DbName,TblName);
			break;
		case LocalVariable.POSTGRESQL_DB:
			query = String.format("	select table_name as 'TABLE_NAME', column_name as 'COLUMN_NAME', data_type as 'DATA_TYPE' from information_schema.columns "+
					"where table_schema ='%s' and  table_name = '%s' order by column_name asc", DbName,TblName);
		default:
			break;
		}
		return query;
	}



	@Override
	public String getObjectFromDb(String DBType, String DbName, String ObjectType) {
		// TODO Auto-generated method stub		
		switch (DBType) {
		case LocalVariable.SQL_SERVER_DB:
			query = String.format("select TABLE_CATALOG as 'DATABASE_NAME',TABLE_NAME as OBJECT_NAME from %s.INFORMATION_SCHEMA."+ ObjectType + " " +					
					"order by TABLE_NAME asc", DbName , DbName);
			break;
		case LocalVariable.POSTGRESQL_DB:
			query =String.format("select table_schema as \"DATABASE_NAME\", TABLE_NAME as \"OBJECT_NAME\" from information_schema."+  ObjectType + " " +
					"where table_schema not in('pg_catalog','information_schema') and table_schema = '%s' order by TABLE_NAME asc", DbName);			
			break;
		default:
			break;
		}
		return query;
	}

}
