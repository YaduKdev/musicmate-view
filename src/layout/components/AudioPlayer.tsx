import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext } = usePlayerStore();

  // Play-Pause
  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  //Autoplay
  useEffect(() => {
    const audio = audioRef.current;

    const handleAutoplay = () => {
      playNext();
    };

    audio?.addEventListener("ended", handleAutoplay);

    return () => audio?.removeEventListener("ended", handleAutoplay);
  }, [playNext]);

  //Prev-Next
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;

    const isNewSong = prevSongRef.current !== currentSong?.audioUrl;

    if (isNewSong) {
      audio.src = currentSong?.audioUrl;
      audio.currentTime = 0;
      prevSongRef.current = currentSong?.audioUrl;

      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
