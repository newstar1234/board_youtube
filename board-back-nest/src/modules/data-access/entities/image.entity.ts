import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name:'image'
})
export default class ImageEntity {

  @PrimaryGeneratedColumn({
    name:'board_number'
  })
  boardNumber: number;

  @Column({
    name:'image'
  })
  image: string;

  @Column({
    name:'sequence'
  })
  sequence: number;

}