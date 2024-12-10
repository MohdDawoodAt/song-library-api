import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SongDocument = HydratedDocument<Song>;

@Schema()
export class Song {
  @Prop()
  name: string;

  @Prop()
  artists: string[];

  @Prop()
  album: string;

  @Prop()
  image: string;

  @Prop()
  releaseDate: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);
