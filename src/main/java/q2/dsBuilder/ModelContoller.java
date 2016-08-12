package q2.dsBuilder;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ModelContoller {
	

	@RequestMapping("/")
	public ModelAndView welcome(Map<String, Object> model) {
		ModelAndView mav = new ModelAndView("index");
		return mav;		
	}
}
