import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class songDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  artists: string;

  @IsString()
  @IsNotEmpty()
  album: string;

  @IsString()
  @IsNotEmpty()
  image: string;
  // popularity: number;

  @IsString()
  @IsNotEmpty()
  releaseDate: string;
}
