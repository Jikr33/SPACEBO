import React, { useEffect, useState } from "react";
import { supabaseAll } from "../supas/supabase.js";
import Table from "rc-table";

type Props = {
  name: string;
};

export default function ScoreBoard({ name }: Props) {
  const [scores, setScores] = useState<Array<Object>>([]);
  const s = async () => {
    var database: Array<Object> = (await supabaseAll()) || [];
    // database = database.map((score: any) => {
    //   if (score.player_name === name) {
    //     return {
    //       ...score,
    //       rowClassName: "playerRow",
    //     };
    //   } else {
    //     return score;
    //   }
    // });
    setScores(
      // database.sort((a: any, b: any) => b.highest_score - a.highest_score)
      database
    );
    console.log(database);
  };
  useEffect(() => {
    s();
  }, []);

  const rowClassSetter = (record: any) => {
    // console.log(record, record.player_name, name);
    if (record.player_name == name) {
      localStorage.setItem("highscore", record.highest_score);
      return "playerRow";
    }
    return "";
  };
  const columns = [
    {
      title: "",
      dataIndex: "count",
      key: "index",
      width: "3.5rem",
      className: "countCell",
    },
    {
      title: "Player Name",
      dataIndex: "player_name",
      key: "name",
      width: "13rem",
      className: "nameCell",
    },
    {
      title: "Last Active",
      dataIndex: "last_visited_at",
      key: "age",
      width: 70,
      className: "middleCell",
    },
    {
      title: "Highest Score",
      dataIndex: "highest_score",
      key: "score",
      width: "14rem",
      className: "scoreCell",
    },
  ];

  return (
    <>
      <Table
        id="table"
        columns={columns}
        data={scores}
        onRow={(record: any) => ({
          className: rowClassSetter(record),
        })}
      />
      {/* <table id="table" className="h-9 w-full">
        <thead>
          <tr>
            <th scope="col" className="countCell"></th>
            <th scope="col" className="coloredCells text-center nameCell">
              Player Name
            </th>
            <th scope="col" className="coloredCells text-center middleCell">
              Last Visited
            </th>
            <th scope="col" className="coloredCells text-center scoreCell">
              Highest Score
            </th>
          </tr>
        </thead>
        <tbody className="coloredCells">
          {scores.map((score: any, i) => {
            return (
              <tr className="h-12" key={i}>
                <th className="countCell text-center">{i + 1}</th>
                <td width={"4rem"}>{score.player_name}</td>
                <td width={"3rem"}>{score.last_visited_at}</td>
                <td width={"4rem"}>{score.highest_score}</td>
              </tr>
            );
          })}
          <tr className="h-12">
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
          </tr>
        </tbody>
      </table> */}
    </>
  );
}
