package q2.dsBuilder;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
	private CommonQuery cQy = new CommonQuery();	
	
	@RequestMapping(value="/getListOfDatabases")
	public List<Map<String,Object>> getListOfDataBases(HttpSession session) throws SQLException{
		String ServerName = "10.50.50.19";
		String userName="";
		String pass ="";
		String sql="";
		if(session.getAttribute(LocalVariable.PARAM_DB_TYPE) == null || session.getAttribute(LocalVariable.PARAM_DB_TYPE) == "" ){			
			session.setAttribute(LocalVariable.PARAM_DB_TYPE, LocalVariable.DEFAULT_DB);
		}
		String dbType = session.getAttribute(LocalVariable.PARAM_DB_TYPE).toString();
		switch (dbType) {
		case LocalVariable.SQL_SERVER_DB:
			userName = "sa";
			pass = "123456";			
			break;
		case LocalVariable.POSTGRESQL_DB:
			userName = "postgres";
			pass = "admin";			
			break;
		default:
			break;
		}
		
		CoreConnection  coreConnect = new CoreConnection(ServerName, userName, pass, 0, dbType);
		sql = cQy.getDatabases(dbType);
		System.out.println("the sql nya : " + sql);
		return coreConnect.getQuery_Result(sql);
		
	}
			
	
	
	@RequestMapping(value="/getListOfTable")
	public List<Map<String, Object>> getListOfTable(HttpSession session,@RequestParam(value=LocalVariable.PARAM_DB_NAME) String DbName) throws SQLException{
		String ServerName = "10.50.50.19";
		String userName="";
		String pass ="";
		String sql="";
		if(session.getAttribute(LocalVariable.PARAM_DB_TYPE) == null || session.getAttribute(LocalVariable.PARAM_DB_TYPE) == "" ){			
			session.setAttribute(LocalVariable.PARAM_DB_TYPE, LocalVariable.DEFAULT_DB);
		}
		String dbType = session.getAttribute(LocalVariable.PARAM_DB_TYPE).toString();
		switch (dbType) {
		case LocalVariable.SQL_SERVER_DB:
			userName = "sa";
			pass = "123456";			
			break;
		case LocalVariable.POSTGRESQL_DB:
			userName = "postgres";
			pass = "admin";			
			break;
		default:
			break;
		}
		
		CoreConnection  coreConnect = new CoreConnection(ServerName, userName, pass, 0, dbType);
		sql = cQy.getTablesFromDb(dbType, DbName);
		System.out.println("the sql nya : " + sql);
		return coreConnect.getQuery_Result(sql);
	}
	
	
	@RequestMapping(value="/switchDBDriver")
	public String changeDefaultDB(@RequestParam(value=LocalVariable.PARAM_DB_TYPE, required=false) String db_type,HttpSession session){
		session.setAttribute(LocalVariable.PARAM_DB_TYPE, db_type);
		String msg = "";
		if(db_type != null && db_type !="") msg = "Switching database driver to " + db_type;
		msg +="now the db driver is :" + db_type;
		return msg;
		
	}

	
	
}
