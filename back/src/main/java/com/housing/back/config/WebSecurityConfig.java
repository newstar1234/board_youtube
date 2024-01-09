package com.housing.back.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.housing.back.filter.JwtAuthenticationFilter;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configurable
@Configuration 
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {
  
  private final JwtAuthenticationFilter jwtAuthenticationFilter;

  @Bean
  protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {

    httpSecurity
          .cors(cors -> cors
            .configurationSource(corsConfiguraionSource())
          )
          .csrf(CsrfConfigurer::disable)
          .httpBasic(HttpBasicConfigurer::disable)
          .sessionManagement(sessionManagement -> sessionManagement
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)    
          )
          .authorizeHttpRequests(request -> request
            .requestMatchers("/", "/api/v1/auth/**").permitAll()
            .requestMatchers("/api/v1/user/**").hasRole("USER") // 권한 부여 // 접두사 ROLE는 생략
            .requestMatchers("/api/v1/admin/**").hasRole("ADMIN") // 권한 부여
            .anyRequest().authenticated()
          )
          .exceptionHandling(exceptionHandling -> exceptionHandling
            .authenticationEntryPoint(new FailedAuthenticationEntryPoint()) // 실패하면 NP 핸들링 
          )
          .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

    return httpSecurity.build();
  }

  @Bean
  protected CorsConfigurationSource corsConfiguraionSource() {

    CorsConfiguration corsConfiguration = new CorsConfiguration();
    corsConfiguration.addAllowedOrigin("*");
    corsConfiguration.addAllowedMethod("*");
    corsConfiguration.addAllowedHeader("*");

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfiguration);

    return source;

  }

}

class FailedAuthenticationEntryPoint implements AuthenticationEntryPoint {

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
      throws IOException, ServletException {

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        // {"code": "NP", "message": "No Permission"}
        response.getWriter().write("{\"code\": \"NP\", \"message\": \"No Permission\"}");

  }
  
}
