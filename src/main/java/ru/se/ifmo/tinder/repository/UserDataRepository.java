package ru.se.ifmo.tinder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.se.ifmo.tinder.dto.UserDataDto;
import ru.se.ifmo.tinder.model.UserData;
import ru.se.ifmo.tinder.model.enums.Location;
import ru.se.ifmo.tinder.model.enums.Sex;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface UserDataRepository extends JpaRepository<UserData,Integer> {
    @Transactional
    @Query(value = "SELECT * FROM GetUserDataOnEarth()", nativeQuery = true)
    List<Integer> getUserDataOnEarth();

    @Transactional
    @Query(value = "SELECT * FROM GetUserDataOnMars()", nativeQuery = true)
    List<Integer> getUserDataOnMars();

    @Transactional
    @Query(value = "SELECT * FROM user_data WHERE user_data_id IN (:idList)", nativeQuery = true)
    List<UserData> getListAllByUserDataIdIn(List<Integer> idList);


    @Transactional
    @Query(value = "SELECT * FROM insert_user_data(:birth_date, :sex, :weight, :height, :hair_color, :location)", nativeQuery = true)
    Integer insertUserData(@Param("birth_date") LocalDate birth_date, @Param("sex") Sex sex, @Param("weight") int weight,
                           @Param("height") int height, @Param("hair_color") String hair_color, @Param("location") Location location);

}

