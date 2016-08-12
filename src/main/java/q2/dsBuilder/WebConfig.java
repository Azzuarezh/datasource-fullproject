package q2.dsBuilder;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;


@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {	

	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/bower_components/**").addResourceLocations("classpath:static/bower_components/");        
		registry.addResourceHandler("/lib/**").addResourceLocations("classpath:static/lib/");
		registry.addResourceHandler("/node_modules/**").addResourceLocations("classpath:static/node_modules/");
    }
	
	  @Bean
	    public ViewResolver getViewResolver() {
	        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
	        resolver.setPrefix("");
	        resolver.setSuffix(".html");
	        return resolver;
	    }

	    @Override
	    public void configureDefaultServletHandling(
	            DefaultServletHandlerConfigurer configurer) {
	        configurer.enable();
	    }   
}
