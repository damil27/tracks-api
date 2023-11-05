import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Priority } from "../enum/Priority";
import { Status } from "../enum/Status";
@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({
    type: "text",
  })
  title: string;
  @Column({
    type: "text",
    length: 255,
  })
  date: string;
  @Column({
    type: "longtext",
  })
  description: string;
  @Column({
    type: "enum",
    enum: Priority.normal,
  })
  priority: Priority;

  @Column({
    type: "enum",
    enum: Status.todo,
  })
  status: Status;
}
