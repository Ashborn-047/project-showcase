import { STATUS_MAP } from "../data/projects";
import { hexToRgb } from "../utils";

export default function StatusBadge({status, small=false}){
  const st = STATUS_MAP[status] || STATUS_MAP.archived;
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:small?8:9,letterSpacing:"0.1em",padding:small?"2px 7px":"3px 9px",background:`rgba(${hexToRgb(st.color)},.1)`,flexShrink:0,fontFamily:"'Courier New',monospace"}}>
      <span style={{width:small?4:5,height:small?4:5,borderRadius:"50%",background:st.color,display:"inline-block",flexShrink:0}}/>
      <span style={{color:st.color}}>{st.label}</span>
    </span>
  );
}
