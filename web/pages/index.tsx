import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import "../styles/Home.module.css";

function Home() {
  const [movies, setMovies] = useState<string[]>([]);
  const MOVIES = ["https://bit.ly/3Jb3ae2", "https://bit.ly/3NOj69w"];

  useEffect(() => {
    setMovies(MOVIES);
  }, []);
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {movies.map((movie, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img style={{ height: "20rem" }} src={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
