
const ProgressBar = ({ p }) => {

  const color =[
    'rgb(255,214,161)','rgb(255,175,163)','rgb(108,115,148)','rgb(141,181,145)'
  ]
  const rand=color[Math.floor(Math.random()*color.length)]
  return (
    <div className="outer">
      <div className="inner"
        style={{ width: `${p}%`, backgroundColor: rand }}
      >
      </div>
    </div>
  );
}

export default ProgressBar;
