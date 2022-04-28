import {Component, OnInit} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import {get as ol_get, Projection} from 'ol/proj';
import Image from 'ol/layer/Image'
import XYZ from "ol/source/XYZ";
import OSM from 'ol/source/OSM';
import * as Proj from 'ol/proj';
import {PrimeNGConfig} from 'primeng/api';
import Static from 'ol/source/ImageStatic';
import ImageLayer from 'ol/layer/Image';

import {MenuItem} from 'primeng/api';
import {MapService} from "./map.service";

interface Layer {
  label: string,
  value: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title: string = 'cempa';
  date: number;
  isStopped: boolean;
  extent: number[];
  projection: Projection;

  groupLayers: Layer[] = [
    {label: 'Precipitação Acumulada em 24h', value: 'precip_acum_'},
    {label: 'Precipitação Horária', value: 'precip_horaria_'},
    {label: 'Temperatura 2m', value: 't2m_'},
    {label: 'Umidade Ralativa do Ar 2m', value: 'ur2m_'}
  ];

  selectedGroupLayers: string = 'ur2m_';

  allLayers: string[] = [
    "precip_acum_20220418",
    "precip_acum_20220419",
    "precip_acum_20220420",
    "precip_acum_20220421",
    "precip_acum_20220422",
    "precip_acum_20220423",
    "precip_acum_20220424",
    "precip_acum_20220425",
    "precip_acum_20220426",
    "precip_acum_20220427",
    "precip_horaria_2022041800",
    "precip_horaria_2022041801",
    "precip_horaria_2022041802",
    "precip_horaria_2022041803",
    "precip_horaria_2022041804",
    "precip_horaria_2022041805",
    "precip_horaria_2022041806",
    "precip_horaria_2022041807",
    "precip_horaria_2022041808",
    "precip_horaria_2022041809",
    "precip_horaria_2022041810",
    "precip_horaria_2022041811",
    "precip_horaria_2022041812",
    "precip_horaria_2022041813",
    "precip_horaria_2022041814",
    "precip_horaria_2022041815",
    "precip_horaria_2022041816",
    "precip_horaria_2022041817",
    "precip_horaria_2022041818",
    "precip_horaria_2022041819",
    "precip_horaria_2022041820",
    "precip_horaria_2022041821",
    "precip_horaria_2022041822",
    "precip_horaria_2022041823",
    "precip_horaria_2022041900",
    "precip_horaria_2022041901",
    "precip_horaria_2022041902",
    "precip_horaria_2022041903",
    "precip_horaria_2022041904",
    "precip_horaria_2022041905",
    "precip_horaria_2022041906",
    "precip_horaria_2022041907",
    "precip_horaria_2022041908",
    "precip_horaria_2022041909",
    "precip_horaria_2022041910",
    "precip_horaria_2022041911",
    "precip_horaria_2022041912",
    "precip_horaria_2022041913",
    "precip_horaria_2022041914",
    "precip_horaria_2022041915",
    "precip_horaria_2022041916",
    "precip_horaria_2022041917",
    "precip_horaria_2022041918",
    "precip_horaria_2022041919",
    "precip_horaria_2022041920",
    "precip_horaria_2022041921",
    "precip_horaria_2022041922",
    "precip_horaria_2022041923",
    "precip_horaria_2022042000",
    "precip_horaria_2022042001",
    "precip_horaria_2022042002",
    "precip_horaria_2022042003",
    "precip_horaria_2022042004",
    "precip_horaria_2022042005",
    "precip_horaria_2022042006",
    "precip_horaria_2022042007",
    "precip_horaria_2022042008",
    "precip_horaria_2022042009",
    "precip_horaria_2022042010",
    "precip_horaria_2022042011",
    "precip_horaria_2022042012",
    "precip_horaria_2022042013",
    "precip_horaria_2022042014",
    "precip_horaria_2022042015",
    "precip_horaria_2022042016",
    "precip_horaria_2022042017",
    "precip_horaria_2022042018",
    "precip_horaria_2022042019",
    "precip_horaria_2022042020",
    "precip_horaria_2022042021",
    "precip_horaria_2022042022",
    "precip_horaria_2022042023",
    "precip_horaria_2022042100",
    "precip_horaria_2022042101",
    "precip_horaria_2022042102",
    "precip_horaria_2022042103",
    "precip_horaria_2022042104",
    "precip_horaria_2022042105",
    "precip_horaria_2022042106",
    "precip_horaria_2022042107",
    "precip_horaria_2022042108",
    "precip_horaria_2022042109",
    "precip_horaria_2022042110",
    "precip_horaria_2022042111",
    "precip_horaria_2022042112",
    "precip_horaria_2022042113",
    "precip_horaria_2022042114",
    "precip_horaria_2022042115",
    "precip_horaria_2022042116",
    "precip_horaria_2022042117",
    "precip_horaria_2022042118",
    "precip_horaria_2022042119",
    "precip_horaria_2022042120",
    "precip_horaria_2022042121",
    "precip_horaria_2022042122",
    "precip_horaria_2022042123",
    "precip_horaria_2022042200",
    "precip_horaria_2022042201",
    "precip_horaria_2022042202",
    "precip_horaria_2022042203",
    "precip_horaria_2022042204",
    "precip_horaria_2022042205",
    "precip_horaria_2022042206",
    "precip_horaria_2022042207",
    "precip_horaria_2022042208",
    "precip_horaria_2022042209",
    "precip_horaria_2022042210",
    "precip_horaria_2022042211",
    "precip_horaria_2022042212",
    "precip_horaria_2022042213",
    "precip_horaria_2022042214",
    "precip_horaria_2022042215",
    "precip_horaria_2022042216",
    "precip_horaria_2022042217",
    "precip_horaria_2022042218",
    "precip_horaria_2022042219",
    "precip_horaria_2022042220",
    "precip_horaria_2022042221",
    "precip_horaria_2022042222",
    "precip_horaria_2022042223",
    "precip_horaria_2022042300",
    "precip_horaria_2022042301",
    "precip_horaria_2022042302",
    "precip_horaria_2022042303",
    "precip_horaria_2022042304",
    "precip_horaria_2022042305",
    "precip_horaria_2022042306",
    "precip_horaria_2022042307",
    "precip_horaria_2022042308",
    "precip_horaria_2022042309",
    "precip_horaria_2022042310",
    "precip_horaria_2022042311",
    "precip_horaria_2022042312",
    "precip_horaria_2022042313",
    "precip_horaria_2022042314",
    "precip_horaria_2022042315",
    "precip_horaria_2022042316",
    "precip_horaria_2022042317",
    "precip_horaria_2022042318",
    "precip_horaria_2022042319",
    "precip_horaria_2022042320",
    "precip_horaria_2022042321",
    "precip_horaria_2022042322",
    "precip_horaria_2022042323",
    "precip_horaria_2022042400",
    "precip_horaria_2022042401",
    "precip_horaria_2022042402",
    "precip_horaria_2022042403",
    "precip_horaria_2022042404",
    "precip_horaria_2022042405",
    "precip_horaria_2022042406",
    "precip_horaria_2022042407",
    "precip_horaria_2022042408",
    "precip_horaria_2022042409",
    "precip_horaria_2022042410",
    "precip_horaria_2022042411",
    "precip_horaria_2022042412",
    "precip_horaria_2022042413",
    "precip_horaria_2022042414",
    "precip_horaria_2022042415",
    "precip_horaria_2022042416",
    "precip_horaria_2022042417",
    "precip_horaria_2022042418",
    "precip_horaria_2022042419",
    "precip_horaria_2022042420",
    "precip_horaria_2022042421",
    "precip_horaria_2022042422",
    "precip_horaria_2022042423",
    "precip_horaria_2022042500",
    "precip_horaria_2022042501",
    "precip_horaria_2022042502",
    "precip_horaria_2022042503",
    "precip_horaria_2022042504",
    "precip_horaria_2022042505",
    "precip_horaria_2022042506",
    "precip_horaria_2022042507",
    "precip_horaria_2022042508",
    "precip_horaria_2022042509",
    "precip_horaria_2022042510",
    "precip_horaria_2022042511",
    "precip_horaria_2022042512",
    "precip_horaria_2022042513",
    "precip_horaria_2022042514",
    "precip_horaria_2022042515",
    "precip_horaria_2022042516",
    "precip_horaria_2022042517",
    "precip_horaria_2022042518",
    "precip_horaria_2022042519",
    "precip_horaria_2022042520",
    "precip_horaria_2022042521",
    "precip_horaria_2022042522",
    "precip_horaria_2022042523",
    "precip_horaria_2022042600",
    "precip_horaria_2022042601",
    "precip_horaria_2022042602",
    "precip_horaria_2022042603",
    "precip_horaria_2022042604",
    "precip_horaria_2022042605",
    "precip_horaria_2022042606",
    "precip_horaria_2022042607",
    "precip_horaria_2022042608",
    "precip_horaria_2022042609",
    "precip_horaria_2022042610",
    "precip_horaria_2022042611",
    "precip_horaria_2022042612",
    "precip_horaria_2022042613",
    "precip_horaria_2022042614",
    "precip_horaria_2022042615",
    "precip_horaria_2022042616",
    "precip_horaria_2022042617",
    "precip_horaria_2022042618",
    "precip_horaria_2022042619",
    "precip_horaria_2022042620",
    "precip_horaria_2022042621",
    "precip_horaria_2022042622",
    "precip_horaria_2022042623",
    "precip_horaria_2022042700",
    "precip_horaria_2022042701",
    "precip_horaria_2022042702",
    "precip_horaria_2022042703",
    "precip_horaria_2022042704",
    "precip_horaria_2022042705",
    "precip_horaria_2022042706",
    "precip_horaria_2022042707",
    "precip_horaria_2022042708",
    "precip_horaria_2022042709",
    "precip_horaria_2022042710",
    "precip_horaria_2022042711",
    "precip_horaria_2022042712",
    "precip_horaria_2022042713",
    "precip_horaria_2022042714",
    "precip_horaria_2022042715",
    "precip_horaria_2022042716",
    "precip_horaria_2022042717",
    "precip_horaria_2022042718",
    "precip_horaria_2022042719",
    "precip_horaria_2022042720",
    "precip_horaria_2022042721",
    "precip_horaria_2022042722",
    "precip_horaria_2022042723",
    "precip_horaria_2022042800",
    "t2m_20220418000000",
    "t2m_20220418010000",
    "t2m_20220418020000",
    "t2m_20220418030000",
    "t2m_20220418040000",
    "t2m_20220418050000",
    "t2m_20220418060000",
    "t2m_20220418070000",
    "t2m_20220418080000",
    "t2m_20220418090000",
    "t2m_20220418100000",
    "t2m_20220418110000",
    "t2m_20220418120000",
    "t2m_20220418130000",
    "t2m_20220418140000",
    "t2m_20220418150000",
    "t2m_20220418160000",
    "t2m_20220418170000",
    "t2m_20220418180000",
    "t2m_20220418190000",
    "t2m_20220418200000",
    "t2m_20220418210000",
    "t2m_20220418220000",
    "t2m_20220418230000",
    "t2m_20220419000000",
    "t2m_20220419010000",
    "t2m_20220419020000",
    "t2m_20220419030000",
    "t2m_20220419040000",
    "t2m_20220419050000",
    "t2m_20220419060000",
    "t2m_20220419070000",
    "t2m_20220419080000",
    "t2m_20220419090000",
    "t2m_20220419100000",
    "t2m_20220419110000",
    "t2m_20220419120000",
    "t2m_20220419130000",
    "t2m_20220419140000",
    "t2m_20220419150000",
    "t2m_20220419160000",
    "t2m_20220419170000",
    "t2m_20220419180000",
    "t2m_20220419190000",
    "t2m_20220419200000",
    "t2m_20220419210000",
    "t2m_20220419220000",
    "t2m_20220419230000",
    "t2m_20220420000000",
    "t2m_20220420010000",
    "t2m_20220420020000",
    "t2m_20220420030000",
    "t2m_20220420040000",
    "t2m_20220420050000",
    "t2m_20220420060000",
    "t2m_20220420070000",
    "t2m_20220420080000",
    "t2m_20220420090000",
    "t2m_20220420100000",
    "t2m_20220420110000",
    "t2m_20220420120000",
    "t2m_20220420130000",
    "t2m_20220420140000",
    "t2m_20220420150000",
    "t2m_20220420160000",
    "t2m_20220420170000",
    "t2m_20220420180000",
    "t2m_20220420190000",
    "t2m_20220420200000",
    "t2m_20220420210000",
    "t2m_20220420220000",
    "t2m_20220420230000",
    "t2m_20220421000000",
    "t2m_20220421010000",
    "t2m_20220421020000",
    "t2m_20220421030000",
    "t2m_20220421040000",
    "t2m_20220421050000",
    "t2m_20220421060000",
    "t2m_20220421070000",
    "t2m_20220421080000",
    "t2m_20220421090000",
    "t2m_20220421100000",
    "t2m_20220421110000",
    "t2m_20220421120000",
    "t2m_20220421130000",
    "t2m_20220421140000",
    "t2m_20220421150000",
    "t2m_20220421160000",
    "t2m_20220421170000",
    "t2m_20220421180000",
    "t2m_20220421190000",
    "t2m_20220421200000",
    "t2m_20220421210000",
    "t2m_20220421220000",
    "t2m_20220421230000",
    "t2m_20220422000000",
    "t2m_20220422010000",
    "t2m_20220422020000",
    "t2m_20220422030000",
    "t2m_20220422040000",
    "t2m_20220422050000",
    "t2m_20220422060000",
    "t2m_20220422070000",
    "t2m_20220422080000",
    "t2m_20220422090000",
    "t2m_20220422100000",
    "t2m_20220422110000",
    "t2m_20220422120000",
    "t2m_20220422130000",
    "t2m_20220422140000",
    "t2m_20220422150000",
    "t2m_20220422160000",
    "t2m_20220422170000",
    "t2m_20220422180000",
    "t2m_20220422190000",
    "t2m_20220422200000",
    "t2m_20220422210000",
    "t2m_20220422220000",
    "t2m_20220422230000",
    "t2m_20220423000000",
    "t2m_20220423010000",
    "t2m_20220423020000",
    "t2m_20220423030000",
    "t2m_20220423040000",
    "t2m_20220423050000",
    "t2m_20220423060000",
    "t2m_20220423070000",
    "t2m_20220423080000",
    "t2m_20220423090000",
    "t2m_20220423100000",
    "t2m_20220423110000",
    "t2m_20220423120000",
    "t2m_20220423130000",
    "t2m_20220423140000",
    "t2m_20220423150000",
    "t2m_20220423160000",
    "t2m_20220423170000",
    "t2m_20220423180000",
    "t2m_20220423190000",
    "t2m_20220423200000",
    "t2m_20220423210000",
    "t2m_20220423220000",
    "t2m_20220423230000",
    "t2m_20220424000000",
    "t2m_20220424010000",
    "t2m_20220424020000",
    "t2m_20220424030000",
    "t2m_20220424040000",
    "t2m_20220424050000",
    "t2m_20220424060000",
    "t2m_20220424070000",
    "t2m_20220424080000",
    "t2m_20220424090000",
    "t2m_20220424100000",
    "t2m_20220424110000",
    "t2m_20220424120000",
    "t2m_20220424130000",
    "t2m_20220424140000",
    "t2m_20220424150000",
    "t2m_20220424160000",
    "t2m_20220424170000",
    "t2m_20220424180000",
    "t2m_20220424190000",
    "t2m_20220424200000",
    "t2m_20220424210000",
    "t2m_20220424220000",
    "t2m_20220424230000",
    "t2m_20220425000000",
    "t2m_20220425010000",
    "t2m_20220425020000",
    "t2m_20220425030000",
    "t2m_20220425040000",
    "t2m_20220425050000",
    "t2m_20220425060000",
    "t2m_20220425070000",
    "t2m_20220425080000",
    "t2m_20220425090000",
    "t2m_20220425100000",
    "t2m_20220425110000",
    "t2m_20220425120000",
    "t2m_20220425130000",
    "t2m_20220425140000",
    "t2m_20220425150000",
    "t2m_20220425160000",
    "t2m_20220425170000",
    "t2m_20220425180000",
    "t2m_20220425190000",
    "t2m_20220425200000",
    "t2m_20220425210000",
    "t2m_20220425220000",
    "t2m_20220425230000",
    "t2m_20220426000000",
    "t2m_20220426010000",
    "t2m_20220426020000",
    "t2m_20220426030000",
    "t2m_20220426040000",
    "t2m_20220426050000",
    "t2m_20220426060000",
    "t2m_20220426070000",
    "t2m_20220426080000",
    "t2m_20220426090000",
    "t2m_20220426100000",
    "t2m_20220426110000",
    "t2m_20220426120000",
    "t2m_20220426130000",
    "t2m_20220426140000",
    "t2m_20220426150000",
    "t2m_20220426160000",
    "t2m_20220426170000",
    "t2m_20220426180000",
    "t2m_20220426190000",
    "t2m_20220426200000",
    "t2m_20220426210000",
    "t2m_20220426220000",
    "t2m_20220426230000",
    "t2m_20220427000000",
    "t2m_20220427010000",
    "t2m_20220427020000",
    "t2m_20220427030000",
    "t2m_20220427040000",
    "t2m_20220427050000",
    "t2m_20220427060000",
    "t2m_20220427070000",
    "t2m_20220427080000",
    "t2m_20220427090000",
    "t2m_20220427100000",
    "t2m_20220427110000",
    "t2m_20220427120000",
    "t2m_20220427130000",
    "t2m_20220427140000",
    "t2m_20220427150000",
    "t2m_20220427160000",
    "t2m_20220427170000",
    "t2m_20220427180000",
    "t2m_20220427190000",
    "t2m_20220427200000",
    "t2m_20220427210000",
    "t2m_20220427220000",
    "t2m_20220427230000",
    "t2m_20220428000000",
    "ur2m_20220418000000",
    "ur2m_20220418010000",
    "ur2m_20220418020000",
    "ur2m_20220418030000",
    "ur2m_20220418040000",
    "ur2m_20220418050000",
    "ur2m_20220418060000",
    "ur2m_20220418070000",
    "ur2m_20220418080000",
    "ur2m_20220418090000",
    "ur2m_20220418100000",
    "ur2m_20220418110000",
    "ur2m_20220418120000",
    "ur2m_20220418130000",
    "ur2m_20220418140000",
    "ur2m_20220418150000",
    "ur2m_20220418160000",
    "ur2m_20220418170000",
    "ur2m_20220418180000",
    "ur2m_20220418190000",
    "ur2m_20220418200000",
    "ur2m_20220418210000",
    "ur2m_20220418220000",
    "ur2m_20220418230000",
    "ur2m_20220419000000",
    "ur2m_20220419010000",
    "ur2m_20220419020000",
    "ur2m_20220419030000",
    "ur2m_20220419040000",
    "ur2m_20220419050000",
    "ur2m_20220419060000",
    "ur2m_20220419070000",
    "ur2m_20220419080000",
    "ur2m_20220419090000",
    "ur2m_20220419100000",
    "ur2m_20220419110000",
    "ur2m_20220419120000",
    "ur2m_20220419130000",
    "ur2m_20220419140000",
    "ur2m_20220419150000",
    "ur2m_20220419160000",
    "ur2m_20220419170000",
    "ur2m_20220419180000",
    "ur2m_20220419190000",
    "ur2m_20220419200000",
    "ur2m_20220419210000",
    "ur2m_20220419220000",
    "ur2m_20220419230000",
    "ur2m_20220420000000",
    "ur2m_20220420010000",
    "ur2m_20220420020000",
    "ur2m_20220420030000",
    "ur2m_20220420040000",
    "ur2m_20220420050000",
    "ur2m_20220420060000",
    "ur2m_20220420070000",
    "ur2m_20220420080000",
    "ur2m_20220420090000",
    "ur2m_20220420100000",
    "ur2m_20220420110000",
    "ur2m_20220420120000",
    "ur2m_20220420130000",
    "ur2m_20220420140000",
    "ur2m_20220420150000",
    "ur2m_20220420160000",
    "ur2m_20220420170000",
    "ur2m_20220420180000",
    "ur2m_20220420190000",
    "ur2m_20220420200000",
    "ur2m_20220420210000",
    "ur2m_20220420220000",
    "ur2m_20220420230000",
    "ur2m_20220421000000",
    "ur2m_20220421010000",
    "ur2m_20220421020000",
    "ur2m_20220421030000",
    "ur2m_20220421040000",
    "ur2m_20220421050000",
    "ur2m_20220421060000",
    "ur2m_20220421070000",
    "ur2m_20220421080000",
    "ur2m_20220421090000",
    "ur2m_20220421100000",
    "ur2m_20220421110000",
    "ur2m_20220421120000",
    "ur2m_20220421130000",
    "ur2m_20220421140000",
    "ur2m_20220421150000",
    "ur2m_20220421160000",
    "ur2m_20220421170000",
    "ur2m_20220421180000",
    "ur2m_20220421190000",
    "ur2m_20220421200000",
    "ur2m_20220421210000",
    "ur2m_20220421220000",
    "ur2m_20220421230000",
    "ur2m_20220422000000",
    "ur2m_20220422010000",
    "ur2m_20220422020000",
    "ur2m_20220422030000",
    "ur2m_20220422040000",
    "ur2m_20220422050000",
    "ur2m_20220422060000",
    "ur2m_20220422070000",
    "ur2m_20220422080000",
    "ur2m_20220422090000",
    "ur2m_20220422100000",
    "ur2m_20220422110000",
    "ur2m_20220422120000",
    "ur2m_20220422130000",
    "ur2m_20220422140000",
    "ur2m_20220422150000",
    "ur2m_20220422160000",
    "ur2m_20220422170000",
    "ur2m_20220422180000",
    "ur2m_20220422190000",
    "ur2m_20220422200000",
    "ur2m_20220422210000",
    "ur2m_20220422220000",
    "ur2m_20220422230000",
    "ur2m_20220423000000",
    "ur2m_20220423010000",
    "ur2m_20220423020000",
    "ur2m_20220423030000",
    "ur2m_20220423040000",
    "ur2m_20220423050000",
    "ur2m_20220423060000",
    "ur2m_20220423070000",
    "ur2m_20220423080000",
    "ur2m_20220423090000",
    "ur2m_20220423100000",
    "ur2m_20220423110000",
    "ur2m_20220423120000",
    "ur2m_20220423130000",
    "ur2m_20220423140000",
    "ur2m_20220423150000",
    "ur2m_20220423160000",
    "ur2m_20220423170000",
    "ur2m_20220423180000",
    "ur2m_20220423190000",
    "ur2m_20220423200000",
    "ur2m_20220423210000",
    "ur2m_20220423220000",
    "ur2m_20220423230000",
    "ur2m_20220424000000",
    "ur2m_20220424010000",
    "ur2m_20220424020000",
    "ur2m_20220424030000",
    "ur2m_20220424040000",
    "ur2m_20220424050000",
    "ur2m_20220424060000",
    "ur2m_20220424070000",
    "ur2m_20220424080000",
    "ur2m_20220424090000",
    "ur2m_20220424100000",
    "ur2m_20220424110000",
    "ur2m_20220424120000",
    "ur2m_20220424130000",
    "ur2m_20220424140000",
    "ur2m_20220424150000",
    "ur2m_20220424160000",
    "ur2m_20220424170000",
    "ur2m_20220424180000",
    "ur2m_20220424190000",
    "ur2m_20220424200000",
    "ur2m_20220424210000",
    "ur2m_20220424220000",
    "ur2m_20220424230000",
    "ur2m_20220425000000",
    "ur2m_20220425010000",
    "ur2m_20220425020000",
    "ur2m_20220425030000",
    "ur2m_20220425040000",
    "ur2m_20220425050000",
    "ur2m_20220425060000",
    "ur2m_20220425070000",
    "ur2m_20220425080000",
    "ur2m_20220425090000",
    "ur2m_20220425100000",
    "ur2m_20220425110000",
    "ur2m_20220425120000",
    "ur2m_20220425130000",
    "ur2m_20220425140000",
    "ur2m_20220425150000",
    "ur2m_20220425160000",
    "ur2m_20220425170000",
    "ur2m_20220425180000",
    "ur2m_20220425190000",
    "ur2m_20220425200000",
    "ur2m_20220425210000",
    "ur2m_20220425220000",
    "ur2m_20220425230000",
    "ur2m_20220426000000",
    "ur2m_20220426010000",
    "ur2m_20220426020000",
    "ur2m_20220426030000",
    "ur2m_20220426040000",
    "ur2m_20220426050000",
    "ur2m_20220426060000",
    "ur2m_20220426070000",
    "ur2m_20220426080000",
    "ur2m_20220426090000",
    "ur2m_20220426100000",
    "ur2m_20220426110000",
    "ur2m_20220426120000",
    "ur2m_20220426130000",
    "ur2m_20220426140000",
    "ur2m_20220426150000",
    "ur2m_20220426160000",
    "ur2m_20220426170000",
    "ur2m_20220426180000",
    "ur2m_20220426190000",
    "ur2m_20220426200000",
    "ur2m_20220426210000",
    "ur2m_20220426220000",
    "ur2m_20220426230000",
    "ur2m_20220427000000",
    "ur2m_20220427010000",
    "ur2m_20220427020000",
    "ur2m_20220427030000",
    "ur2m_20220427040000",
    "ur2m_20220427050000",
    "ur2m_20220427060000",
    "ur2m_20220427070000",
    "ur2m_20220427080000",
    "ur2m_20220427090000",
    "ur2m_20220427100000",
    "ur2m_20220427110000",
    "ur2m_20220427120000",
    "ur2m_20220427130000",
    "ur2m_20220427140000",
    "ur2m_20220427150000",
    "ur2m_20220427160000",
    "ur2m_20220427170000",
    "ur2m_20220427180000",
    "ur2m_20220427190000",
    "ur2m_20220427200000",
    "ur2m_20220427210000",
    "ur2m_20220427220000",
    "ur2m_20220427230000",
    "ur2m_20220428000000"
  ];
  selectedLayer: string = '';
  selectedLayersMap: string[];

  map: Map | undefined;

  items: MenuItem[];
  layer: Array<TileLayer<any>> | undefined;
  image: Image<any> | undefined;
  serie: any[];
  display: boolean = false;
  coordinate: number[] = [];
  opacity: number = 0.6;

  constructor(
    private primengConfig: PrimeNGConfig,
    private mapService: MapService
  ) {
    this.extent = [-55.0000000000000000, -21.0000000000000000, -42.9614372253417969, -8.9754829406738299];
    this.selectedLayersMap = this.allLayers.filter(lay => lay?.includes(this.selectedGroupLayers));
    // Configurações da projeção utilizada.
    proj4.defs('EPSG:4674', '+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs');
    register(proj4);

    const wordExtent: Array<number> = [-122.19, -59.87, -25.28, 32.72];

    ol_get('EPSG:4674').setExtent(this.extent);
    ol_get('EPSG:4674').setWorldExtent(wordExtent);

    this.projection = new Projection({
      code: 'EPSG:4674',
      units: 'm',
      extent: this.extent,
      worldExtent: wordExtent
    });

    this.date = 0;
    this.serie = [];
    this.items = [
      {label: 'Temperaturas', icon: 'pi pi-fw pi-circle-fill', command: event => this.changeLayer(3)}
    ];
    this.isStopped = false;

  }
  initMap(){
    this.map = new Map({
      view: new View({
        // center: Proj.fromLonLat([-49.624, -16.042], 'EPSG:4674'), Centroid of grid
        center: Proj.fromLonLat([-49.2588537, -16.680182], 'EPSG:4674'),
        zoom: 6,
        extent: this.extent,
        projection: this.projection
      }),
      layers: [
        new TileLayer({
          properties: {
            type: 'base'
          },
          source: new OSM(),
        }),
        new TileLayer({
          properties: {
            type: 'base'
          },
          source: new XYZ({
            urls: [
              `https://o1.lapig.iesa.ufg.br/ows?layers=municipios_goias&mode=tile&tile={x}+{y}+{z}&tilemode=gmap&map.imagetype=png`,
              `https://o2.lapig.iesa.ufg.br/ows?layers=municipios_goias&mode=tile&tile={x}+{y}+{z}&tilemode=gmap&map.imagetype=png`,
              `https://o3.lapig.iesa.ufg.br/ows?layers=municipios_goias&mode=tile&tile={x}+{y}+{z}&tilemode=gmap&map.imagetype=png`,
              `https://o4.lapig.iesa.ufg.br/ows?layers=municipios_goias&mode=tile&tile={x}+{y}+{z}&tilemode=gmap&map.imagetype=png`,
            ]
          })
        })
      ],
      target: 'ol-map'
    });

    for (let i = 0; i < this.selectedLayersMap.length; i++) {
      this.map?.addLayer(this.creatLayer(i))
    }

    const self = this;
    this.map.on('singleclick', function (evt) {
      self.coordinate = evt.coordinate;
      self.display = true;
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.initMap();
  }

  creatLayer(layer: number) {
    this.selectedLayer = this.selectedLayersMap[layer]
    let visible = false
    let opacity = 0.0

    if (layer < 3) {
      visible = true
      opacity = 0.0
    }
    if (layer == 0) {
      visible = true
      opacity = this.opacity
    }
    return  new ImageLayer({
      properties: {
        type: 'data',
        key: layer,
        label: this.selectedLayer,
        visible: visible
      },
      opacity: opacity,
      visible: visible,
      source: new Static({
        attributions: '©<a href="https://cempa.ufg.br/">CEMPA</a>',
        url: 'https://cempadev.lapig.iesa.ufg.br/service/static/layer/' + this.selectedLayersMap[layer] + '.png',
        projection: this.projection,
        imageExtent: this.extent,
      }),
    });
  }

  changeLayer(key: number) {
    const self = this
    this.map?.getLayers().forEach(layer => {
      let tmpkey = key['value']
      if (layer.get('key') > tmpkey - 8 && layer.get('key') < tmpkey + 8 || layer.get('type') === 'base') {
        if (layer.get('key') === tmpkey || layer.get('type') === 'base') {
          layer.setVisible(true)
          layer.setOpacity(self.opacity)
        } else {
          layer.setVisible(true)
          layer.setOpacity(0.0)
        }
      } else {
        layer.setVisible(false)
      }
    });

  }

  onDateChange(ev: any) {
    this.selectedLayer= this.selectedLayersMap[ev.value];
    this.changeLayer(ev)
  }

  play() {
    this.isStopped = false;
    setInterval(() => {
      if (!this.isStopped) {
        if (this.date == this.selectedLayersMap.length - 1) {
          this.date = 0
        } else {
          this.date++;
        }
        this.onDateChange({value: this.date})
      }
    }, 400);
  }

  stop() {
    this.isStopped = true;
  }

  getDateOnly(date): string{
    // console.log(date)
    return 'barra_' + date.slice(0, -6)
  }

  formatDate(date): string {
    const lay = this.selectedGroupLayers.replace('_', '');
    date = date.replace(lay, '').split("_");
    let dt = date.at(-1).substring(0, 4) + '-' + date.at(-1).substring(4, 6) + '-' +  date.at(-1).substring(6, 8);
    let time = date.at(-1).substring(8, 10) + ":" + date.at(-1).substring(10, 12);
    return dt + ' ' + time;
  }

  onChange(evt) {
    this.selectedLayersMap = this.allLayers.filter(lay => lay.includes(evt.value));
    this.map?.setTarget('')
    this.map = undefined;
    this.initMap();
  }

}
