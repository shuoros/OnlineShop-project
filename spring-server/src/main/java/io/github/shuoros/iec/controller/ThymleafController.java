package io.github.shuoros.iec.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.lang.invoke.MethodHandles;

@Controller
public class ThymleafController {

    private static final Logger log = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    @RequestMapping("/")
    public String index(@RequestParam(defaultValue = "null") String jwt, @RequestParam(defaultValue = "null") String who,
                        HttpServletRequest request, Model model) {
        log.info("<=== handleIndexResource: session=" + jwt + ", ip=" + request.getRemoteAddr() + ", user-agent="
                + request.getHeader("User-Agent"));
        if ("admin".equals(who)) {
            model.addAttribute("who", "admin");
        } else if ("user".equals(who)) {
            model.addAttribute("who", "user");
        }
        return "index";
    }

}