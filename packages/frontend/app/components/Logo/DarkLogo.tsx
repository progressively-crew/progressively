import { styled } from "~/stitches.config";
import { Link } from "../Link";

export interface LogoProps {
  to?: string;
}

const LinkWrapper = styled(Link, {
  textDecoration: "none",
  color: "$textAccent",
  transition: "all 0.1s",

  "&:hover": {
    transform: "scale(1.05)",
  },

  "& span:first-of-type": {
    color: "$secondary",
  },

  "& svg": {
    height: "40px",
    width: "100%",
  },
});

export const DarkLogo = ({ to }: LogoProps) => {
  return (
    <LinkWrapper to={to || "/dashboard"} aria-label="Progressively">
      <svg
        width="1946"
        height="387"
        viewBox="0 0 1946 387"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M153.923 32.7148L308.429 132.249C319.698 139.508 319.698 155.987 308.429 163.247L158.659 259.73C146.393 267.632 130.246 258.824 130.246 244.231L130.246 45.5364H145.667L153.923 32.7148ZM160.966 73.7996L160.966 221.696L273.529 148.492L160.966 73.7996Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M209.216 295.562C207.9 294.653 206.104 295.595 206.104 297.194V341.384C206.104 342.947 207.829 343.896 209.15 343.06L242.509 321.926C243.709 321.165 243.744 319.426 242.575 318.618L209.216 295.562Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M164.776 209.996C163.125 211.062 160.949 209.877 160.949 207.912L160.949 68.6898C160.949 66.7191 163.137 65.5354 164.787 66.6133L272 136.637C273.503 137.619 273.497 139.823 271.988 140.797L164.776 209.996ZM160.949 371.103V250.482C160.949 249.639 161.377 248.853 162.087 248.396L308.954 153.834C320.264 146.552 320.264 130.021 308.954 122.739L175.058 36.5281C173.149 35.299 173.763 32.4011 176.016 32.1189C182.847 31.2633 189.807 30.8225 196.869 30.8225C288.569 30.8225 362.906 105.134 362.906 196.802C362.906 251.736 336.224 300.439 295.043 330.673C288.18 335.712 286.703 345.357 291.743 352.217C296.783 359.077 306.432 360.554 313.294 355.516C362.045 319.724 393.739 261.961 393.739 196.802C393.739 88.1111 305.597 0 196.869 0C88.1414 0 0 88.1111 0 196.802C0 285.088 58.1431 359.761 138.208 384.714C138.35 384.758 138.487 384.815 138.62 384.882C140.699 385.926 143.047 386.514 145.532 386.514C146.789 386.514 148.011 386.364 149.181 386.08C151.11 385.657 152.899 384.835 154.463 383.666C158.388 380.873 160.949 376.287 160.949 371.103ZM126.652 46.352C128.275 45.5938 130.116 46.7912 130.116 48.5819L130.116 235.072V345.026C130.116 346.817 128.275 348.014 126.652 347.256C70.0409 320.808 30.8331 263.367 30.8331 196.802C30.8331 130.221 70.0498 72.7962 126.652 46.352ZM204.08 354.157C202.428 355.22 200.255 354.035 200.255 352.071V285.67C200.255 283.662 202.519 282.486 204.163 283.641L253.482 318.285C254.923 319.297 254.88 321.447 253.399 322.4L204.08 354.157ZM202.128 259.954C193.673 254.015 182.025 260.054 182.025 270.377V366.639C182.025 376.729 193.209 382.816 201.701 377.349L273.199 331.311C280.808 326.412 281.03 315.38 273.626 310.178L202.128 259.954Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M164.776 209.996C163.125 211.062 160.949 209.877 160.949 207.912L160.949 68.6898C160.949 66.7191 163.137 65.5354 164.787 66.6133L272 136.637C273.503 137.619 273.497 139.823 271.988 140.797L164.776 209.996ZM160.949 371.103V250.482C160.949 249.639 161.377 248.853 162.087 248.396L308.954 153.834C320.264 146.552 320.264 130.021 308.954 122.739L175.058 36.5281C173.149 35.299 173.763 32.4011 176.016 32.1189C182.847 31.2633 189.807 30.8225 196.869 30.8225C288.569 30.8225 362.906 105.134 362.906 196.802C362.906 251.736 336.224 300.439 295.043 330.673C288.18 335.712 286.703 345.357 291.743 352.217C296.783 359.077 306.432 360.554 313.294 355.516C362.045 319.724 393.739 261.961 393.739 196.802C393.739 88.1111 305.597 0 196.869 0C88.1414 0 0 88.1111 0 196.802C0 285.088 58.1431 359.761 138.208 384.714C138.35 384.758 138.487 384.815 138.62 384.882C140.699 385.926 143.047 386.514 145.532 386.514C146.789 386.514 148.011 386.364 149.181 386.08C151.11 385.657 152.899 384.835 154.463 383.666C158.388 380.873 160.949 376.287 160.949 371.103ZM126.652 46.352C128.275 45.5938 130.116 46.7912 130.116 48.5819L130.116 235.072V345.026C130.116 346.817 128.275 348.014 126.652 347.256C70.0409 320.808 30.8331 263.367 30.8331 196.802C30.8331 130.221 70.0498 72.7962 126.652 46.352ZM204.08 354.157C202.428 355.22 200.255 354.035 200.255 352.071V285.67C200.255 283.662 202.519 282.486 204.163 283.641L253.482 318.285C254.923 319.297 254.88 321.447 253.399 322.4L204.08 354.157ZM202.128 259.954C193.673 254.015 182.025 260.054 182.025 270.377V366.639C182.025 376.729 193.209 382.816 201.701 377.349L273.199 331.311C280.808 326.412 281.03 315.38 273.626 310.178L202.128 259.954Z"
          fill="url(#paint0_linear_65_10)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M164.776 209.996C163.125 211.062 160.949 209.877 160.949 207.912L160.949 68.6898C160.949 66.7191 163.137 65.5354 164.787 66.6133L272 136.637C273.503 137.619 273.497 139.823 271.988 140.797L164.776 209.996ZM160.949 371.103V250.482C160.949 249.639 161.377 248.853 162.087 248.396L308.954 153.834C320.264 146.552 320.264 130.021 308.954 122.739L175.058 36.5281C173.149 35.299 173.763 32.4011 176.016 32.1189C182.847 31.2633 189.807 30.8225 196.869 30.8225C288.569 30.8225 362.906 105.134 362.906 196.802C362.906 251.736 336.224 300.439 295.043 330.673C288.18 335.712 286.703 345.357 291.743 352.217C296.783 359.077 306.432 360.554 313.294 355.516C362.045 319.724 393.739 261.961 393.739 196.802C393.739 88.1111 305.597 0 196.869 0C88.1414 0 0 88.1111 0 196.802C0 285.088 58.1431 359.761 138.208 384.714C138.35 384.758 138.487 384.815 138.62 384.882C140.699 385.926 143.047 386.514 145.532 386.514C146.789 386.514 148.011 386.364 149.181 386.08C151.11 385.657 152.899 384.835 154.463 383.666C158.388 380.873 160.949 376.287 160.949 371.103ZM126.652 46.352C128.275 45.5938 130.116 46.7912 130.116 48.5819L130.116 235.072V345.026C130.116 346.817 128.275 348.014 126.652 347.256C70.0409 320.808 30.8331 263.367 30.8331 196.802C30.8331 130.221 70.0498 72.7962 126.652 46.352ZM204.08 354.157C202.428 355.22 200.255 354.035 200.255 352.071V285.67C200.255 283.662 202.519 282.486 204.163 283.641L253.482 318.285C254.923 319.297 254.88 321.447 253.399 322.4L204.08 354.157ZM202.128 259.954C193.673 254.015 182.025 260.054 182.025 270.377V366.639C182.025 376.729 193.209 382.816 201.701 377.349L273.199 331.311C280.808 326.412 281.03 315.38 273.626 310.178L202.128 259.954Z"
          fill="white"
          fillOpacity="0.1"
        />
        <path
          d="M518.849 203.126H542.644C555.367 203.126 567.099 200.975 577.84 196.671C588.746 192.367 597.503 185.829 604.113 177.057C610.722 168.119 614.027 157.194 614.027 144.284C614.027 131.208 610.888 120.118 604.609 111.014C598.495 101.745 590.15 94.8762 579.575 90.4071C569.165 85.7726 557.515 83.4553 544.627 83.4553H473.739V252.286H518.849V203.126ZM543.139 118.959C550.575 118.959 556.441 121.277 560.737 125.911C565.199 130.546 567.43 136.67 567.43 144.284C567.43 150.905 565.199 156.45 560.737 160.919C556.276 165.388 550.575 167.622 543.635 167.622H518.849V118.959H543.139Z"
          fill="white"
        />
        <path
          d="M676.492 181.526C681.614 177.553 687.728 174.326 694.833 171.843C701.939 169.36 708.466 168.119 714.414 168.119L705.243 131.87C698.964 131.87 692.107 133.36 684.671 136.339C677.235 139.318 670.626 142.794 664.842 146.767L653.937 132.118H631.381V252.286H676.492V181.526Z"
          fill="white"
        />
        <path
          d="M858.057 192.699C858.057 205.775 855 217.03 848.886 226.465C842.937 235.899 834.675 243.017 824.1 247.817C813.69 252.617 801.958 255.017 788.904 255.017C768.745 255.017 752.468 249.637 740.075 238.879C727.848 227.954 721.734 212.147 721.734 191.457C721.734 178.381 724.708 167.043 730.657 157.443C736.771 147.677 744.95 140.311 755.195 135.346C765.605 130.215 777.172 127.649 789.895 127.649C803.28 127.649 815.094 130.132 825.339 135.098C835.584 140.063 843.598 147.429 849.382 157.194C855.165 166.96 858.057 178.795 858.057 192.699ZM789.4 218.271C796.505 218.271 801.958 216.12 805.758 211.816C809.559 207.513 811.459 201.14 811.459 192.699C811.459 184.423 809.559 177.636 805.758 172.34C802.123 167.043 797.001 164.395 790.391 164.395C783.451 164.395 777.998 166.795 774.032 171.595C770.232 176.395 768.331 183.016 768.331 191.457C768.331 199.733 770.149 206.271 773.784 211.071C777.42 215.871 782.625 218.271 789.4 218.271Z"
          fill="white"
        />
        <path
          d="M992.606 132.118V256.258C992.606 266.52 989.797 275.624 984.178 283.569C978.725 291.679 970.959 297.969 960.88 302.438C950.965 307.073 939.481 309.39 926.427 309.39C919.487 309.39 910.316 308.149 898.915 305.666C887.513 303.349 878.342 299.955 871.402 295.486L885.035 263.707C892.305 267.348 898.997 269.748 905.111 270.907C911.225 272.231 917.256 272.893 923.205 272.893C930.31 272.893 936.094 271.238 940.555 267.927C945.182 264.782 947.495 260.81 947.495 256.01V251.789C941.381 253.941 935.433 255.017 929.649 255.017C911.142 255.017 896.188 249.72 884.787 239.127C873.55 228.534 867.932 212.892 867.932 192.202C867.932 171.181 873.633 155.208 885.035 144.284C896.601 133.194 912.134 127.649 931.632 127.649C943.529 127.649 954.353 131.622 964.102 139.567L970.05 132.118H992.606ZM936.589 220.258C940.225 220.258 943.86 219.016 947.495 216.533V165.636C942.703 163.484 938.407 162.408 934.607 162.408C928.823 162.408 924.031 165.057 920.231 170.353C916.43 175.65 914.53 182.85 914.53 191.954C914.53 201.057 916.43 208.092 920.231 213.057C924.031 217.858 929.484 220.258 936.589 220.258Z"
          fill="white"
        />
        <path
          d="M1058.31 180.285C1064.26 175.153 1070.95 171.015 1078.39 167.871C1085.99 164.56 1092.68 162.905 1098.47 162.905L1090.78 131.87C1084.67 131.87 1077.81 133.691 1070.21 137.332C1062.61 140.808 1055.92 144.78 1050.13 149.25L1039.23 132.118H1019.4V252.286H1058.31V180.285Z"
          fill="white"
        />
        <path
          d="M1225.34 190.961C1225.34 179.209 1223.19 168.615 1218.89 159.181C1214.76 149.746 1208.48 142.215 1200.05 136.587C1191.63 130.96 1181.3 128.146 1169.07 128.146C1156.84 128.146 1145.94 130.794 1136.35 136.091C1126.94 141.222 1119.58 148.67 1114.29 158.436C1109.01 168.036 1106.36 179.291 1106.36 192.202C1106.36 211.899 1112.64 227.292 1125.2 238.382C1137.92 249.472 1155.27 255.017 1177.25 255.017C1187 255.017 1195.92 253.775 1204.02 251.293C1212.28 248.81 1219.22 245.499 1224.84 241.361L1213.93 214.299C1202.7 220.589 1191.38 223.734 1179.98 223.734C1162.46 223.734 1151.89 216.699 1148.25 202.63H1225.34V190.961ZM1147.76 180.533C1148.42 174.409 1150.57 169.526 1154.2 165.884C1158 162.077 1162.63 160.174 1168.08 160.174C1173.86 160.174 1178.41 162.077 1181.71 165.884C1185.18 169.526 1187.41 174.409 1188.4 180.533H1147.76Z"
          fill="white"
        />
        <path
          d="M1236.84 241.858C1242.46 246.327 1249.98 249.637 1259.4 251.789C1268.81 253.941 1276.83 255.017 1283.44 255.017C1299.8 255.017 1312.19 251.624 1320.62 244.837C1329.21 238.051 1333.51 228.451 1333.51 216.037C1333.51 198.823 1319.71 185.416 1292.11 175.815C1281.7 172.174 1276.5 169.029 1276.5 166.381C1276.5 164.064 1277.74 162.16 1280.22 160.67C1282.69 159.181 1285.83 158.436 1289.63 158.436C1298.56 158.436 1308.8 161.001 1320.37 166.133L1331.52 140.808C1325.74 136.504 1318.63 133.36 1310.21 131.373C1301.94 129.222 1294.67 128.146 1288.4 128.146C1272.86 128.146 1260.63 131.622 1251.71 138.573C1242.79 145.36 1238.33 154.712 1238.33 166.629C1238.33 176.064 1242.21 183.843 1249.98 189.967C1257.74 196.092 1267.66 201.223 1279.72 205.361C1284.84 207.016 1288.81 208.837 1291.62 210.823C1294.59 212.809 1296.08 214.878 1296.08 217.03C1296.08 219.513 1294.51 221.499 1291.37 222.989C1288.4 224.313 1284.92 224.975 1280.96 224.975C1276.66 224.975 1271.38 224.23 1265.1 222.74C1258.98 221.085 1253.36 219.016 1248.24 216.533L1236.84 241.858Z"
          fill="white"
        />
        <path
          d="M1345.04 241.858C1350.65 246.327 1358.17 249.637 1367.59 251.789C1377.01 253.941 1385.02 255.017 1391.63 255.017C1407.99 255.017 1420.39 251.624 1428.81 244.837C1437.41 238.051 1441.7 228.451 1441.7 216.037C1441.7 198.823 1427.9 185.416 1400.31 175.815C1389.9 172.174 1384.69 169.029 1384.69 166.381C1384.69 164.064 1385.93 162.16 1388.41 160.67C1390.89 159.181 1394.03 158.436 1397.83 158.436C1406.75 158.436 1417 161.001 1428.57 166.133L1439.72 140.808C1433.94 136.504 1426.83 133.36 1418.4 131.373C1410.14 129.222 1402.87 128.146 1396.59 128.146C1381.06 128.146 1368.83 131.622 1359.91 138.573C1350.99 145.36 1346.52 154.712 1346.52 166.629C1346.52 176.064 1350.41 183.843 1358.17 189.967C1365.94 196.092 1375.85 201.223 1387.92 205.361C1393.04 207.016 1397 208.837 1399.81 210.823C1402.79 212.809 1404.28 214.878 1404.28 217.03C1404.28 219.513 1402.71 221.499 1399.57 222.989C1396.59 224.313 1393.12 224.975 1389.16 224.975C1384.86 224.975 1379.57 224.23 1373.29 222.74C1367.18 221.085 1361.56 219.016 1356.44 216.533L1345.04 241.858Z"
          fill="white"
        />
        <path
          d="M1476.78 114.739C1481.9 114.739 1486.2 113.001 1489.67 109.525C1493.3 106.049 1495.12 101.745 1495.12 96.6141C1495.12 91.483 1493.3 87.1795 1489.67 83.7036C1486.2 80.2276 1481.9 78.4897 1476.78 78.4897C1471.82 78.4897 1467.61 80.2276 1464.14 83.7036C1460.67 87.1795 1458.93 91.483 1458.93 96.6141C1458.93 101.745 1460.67 106.049 1464.14 109.525C1467.61 113.001 1471.82 114.739 1476.78 114.739ZM1493.14 252.286V131.87H1460.92V252.286H1493.14Z"
          fill="white"
        />
        <path
          d="M1581.43 252.286L1628.78 131.87H1594.82L1568.55 204.864L1540.79 127.401L1509.31 136.835L1553.67 252.286H1581.43Z"
          fill="white"
        />
        <path
          d="M1752.69 191.705C1752.69 179.953 1750.71 169.36 1746.75 159.926C1742.78 150.325 1736.67 142.711 1728.4 137.084C1720.14 131.456 1709.98 128.642 1697.92 128.642C1685.52 128.642 1674.78 131.291 1665.7 136.587C1656.61 141.718 1649.58 149.084 1644.63 158.684C1639.84 168.284 1637.44 179.457 1637.44 192.202C1637.44 211.899 1643.31 227.375 1655.04 238.63C1666.93 249.72 1684.28 255.265 1707.09 255.265C1716.84 255.265 1725.26 254.024 1732.37 251.541C1739.47 248.893 1746.08 245.168 1752.2 240.368L1742.78 217.03C1736.67 220.506 1730.97 223.154 1725.68 224.975C1720.39 226.796 1714.44 227.706 1707.83 227.706C1696.43 227.706 1687.92 225.471 1682.3 221.002C1676.85 216.533 1673.3 210.078 1671.64 201.637H1752.69V191.705ZM1671.89 180.036C1673.21 172.257 1676.11 166.381 1680.57 162.408C1685.03 158.27 1690.56 156.201 1697.17 156.201C1703.78 156.201 1709.15 158.188 1713.28 162.16C1717.58 166.133 1720.55 172.091 1722.21 180.036H1671.89Z"
          fill="white"
        />
        <path
          d="M1806.89 252.286V77L1774.91 79.7311V252.286H1806.89Z"
          fill="white"
        />
        <path
          d="M1861.12 257.996C1859.3 262.962 1855.66 267.1 1850.21 270.41C1844.92 273.721 1838.07 277.196 1829.64 280.838L1841.04 307.404C1852.11 304.756 1862.36 299.873 1871.78 292.755C1881.19 285.804 1887.72 277.61 1891.36 268.176L1945.14 131.87H1911.18L1884.91 204.864L1857.15 127.401L1825.43 136.835L1866.82 243.844L1861.12 257.996Z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="paint0_linear_65_10"
            x1="375.636"
            y1="53.6324"
            x2="28.1585"
            y2="463.978"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F8B9CE" />
            <stop offset="0.279677" stopColor="#9F47A0" />
            <stop offset="0.624442" stopColor="#430A8B" />
            <stop offset="1" stopColor="#1E4EC8" />
          </linearGradient>
        </defs>
      </svg>
    </LinkWrapper>
  );
};
