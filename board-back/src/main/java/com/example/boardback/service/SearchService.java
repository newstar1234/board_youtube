package com.example.boardback.service;

import org.springframework.http.ResponseEntity;

import com.example.boardback.dto.response.search.GetPopularListResponseDto;

public interface SearchService {
  
  ResponseEntity<? super GetPopularListResponseDto> getPopularList();

}
