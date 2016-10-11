package q2.dsBuilder;

import java.util.List;
import java.util.Map;

public interface CommonQueryInterface {

	public String getDatabases(String DBType);	
	public String getColumnsFromTable(String DBType, String DbName, String TblName);
	public String getObjectFromDb(String DBType, String DbName, String ObjectType);	
		
}
