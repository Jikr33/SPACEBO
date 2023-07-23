import React, { useEffect, useState } from "react";
import { supabaseAll } from "../supabase.js";

type Props = {};

export default function ScoreBoard({}: Props) {
  const [scores, setScores] = useState<Array<Object>>([]);
  const s = async () => {
    const database: Array<Object> = (await supabaseAll()) || [];
    setScores(
      database.sort((a: any, b: any) => b.highest_score - a.highest_score)
    );
    console.log(database);
  };
  useEffect(() => {
    s();
  }, []);

  return (
    <>
      <div id="table">
        <table className="h-9 w-full">
          <thead>
            <tr>
              <th scope="col" className="w-10"></th>
              <th scope="col" className="coloredCells text-center w-3/12">
                Player Name
              </th>
              <th scope="col" className="coloredCells text-center w-2/6">
                Last Visited
              </th>
              <th scope="col" className="coloredCells text-center w-1/3">
                Highest Score
              </th>
            </tr>
          </thead>
          <tbody className="coloredCells">
            {scores.map((score: any, i) => {
              return (
                <tr className="h-12" key={i}>
                  <td scope="row" className="w-10 text-center">
                    {i + 1}
                  </td>
                  <td>{score.player_name}</td>
                  <td>{score.last_visited_at}</td>
                  <td>{score.highest_score}</td>
                </tr>
              );
            })}
            {/* <tr className="h-12">
              <th scope="row" className="w-10 text-center">
                1
              </th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
}
