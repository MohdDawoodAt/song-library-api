import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SongDocument = HydratedDocument<Song>;

@Schema()
export class Song {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  artists: string;

  @Prop({ required: true })
  album: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  releaseDate: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);
