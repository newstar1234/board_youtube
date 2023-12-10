package com.example.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.boardback.entity.BoardEntity;
import com.example.boardback.repository.resultSet.GetBoardResultSet;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer>{

  boolean existsByBoardNumber(Integer boardNumber);

  BoardEntity findByBoardNumber(Integer boardNumber);
 
  // description : ?1 => 는 매개변수 boardNumber의 첫번째를 받겠다는 의미 //
  @Query(
    value = 
    "SELECT  " +
    "B.board_number AS boardNumber, " +
    "B.title AS title, " +
    "B.content AS content, " +
    "B.write_datetime AS writeDatetime, " +
    "B.writer_email AS writerEmail, " +
    "U.nickname AS writerNickname, " +
    "U.profile_image AS writerProfileImage " +
    "FROM board AS B " +
    "INNER JOIN user AS U " +
    "on B.writer_email = U.email " +
    "WHERE board_number = ?1 ",
    nativeQuery = true
  )
  GetBoardResultSet getBoard(Integer boardNumber);

}
