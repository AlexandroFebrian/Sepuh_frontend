export default function Cross() {
  return (
    <>
      <div className="cross">
        <div className="animation-ctn">
          <div className="icon icon--order-success svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="154px"
              height="154px"
            >
              <g fill="none" stroke="#F44812" strokeWidth="2">
                <circle
                  cx="77"
                  cy="77"
                  r="72"
                  style={{
                    strokeDasharray: "480px, 480px",
                    strokeDashoffset: "960px",
                  }}
                ></circle>
                <circle
                  id="colored"
                  fill="#F44812"
                  cx="77"
                  cy="77"
                  r="72"
                  style={{
                    strokeDasharray: "480px, 480px",
                    strokeDashoffset: "960px",
                  }}
                ></circle>
                <line
                  x1="50"
                  x2="104"
                  y1="50"
                  y2="104"
                  stroke="#fff"
                  strokeWidth="10"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: "100px, 100px",
                    strokeDashoffset: "200px",
                  }}
                />
                <line
                  x1="50"
                  x2="104"
                  y1="104"
                  y2="50"
                  stroke="#fff"
                  strokeWidth="10"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: "100px, 100px",
                    strokeDashoffset: "200px",
                  }}
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
