import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const DuckGame = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    // Matter.js のエンジンとレンダラーを作成
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false, // ワイヤーフレームを無効にして画像表示に対応
        background: '#f0f8ff',
      },
    });

    // 地面の作成
    const ground = Matter.Bodies.rectangle(400, 580, 810, 60, { isStatic: true });
    Matter.World.add(engine.world, [ground]);

    // ランダムな位置にアヒルを生成する関数
    const createDuck = () => {
      const xPosition = Math.random() * 760 + 20; // ランダムなX座標（20〜780）
      const duck = Matter.Bodies.rectangle(xPosition, 0, 80, 80, {
        render: {
          sprite: {
            texture: 'ahiru.png', // 画像パス
            xScale: 0.4,
            yScale: 0.4,
          },
        },
      });
      Matter.World.add(engine.world, duck);
    };

    // 2秒ごとにアヒルを落下させる
    const duckInterval = setInterval(createDuck, 2000);

    const Runner     = Matter.Runner;

    //Matter.Engine.run(engine); // 物理エンジンの開始
    //Matter.Render.run(render); // 描画の開始
    Matter.Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // コンポーネントのアンマウント時にクリーンアップ
    return () => {
      clearInterval(duckInterval);
      Matter.Render.stop(render);
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default DuckGame;
