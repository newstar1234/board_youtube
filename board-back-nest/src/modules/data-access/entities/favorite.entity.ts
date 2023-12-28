import { Entity, PrimaryColumn } from "typeorm";

@Entity({
  name: 'favorite'
})
export default class FavoriteEntity {
  
  @PrimaryColumn({
    name:'user_email'
  })
  userEmail: string;

  @PrimaryColumn({
    name:'board_number'
  })
  boardNumber: number;

}