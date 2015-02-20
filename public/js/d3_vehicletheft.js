 $(document).ready(function() {



 // * ------d3 js -------------*
var svg = d3.select("body")
  .append("svg")
  .append("g")

svg.append("g")
  .attr("class", "slices");
svg.append("g")
  .attr("class", "labels");
svg.append("g")
  .attr("class", "lines");

var width = 960,
    height = 450,
  radius = Math.min(width, height) / 2;

var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) {
    return d.value;
  });

var arc = d3.svg.arc()
  .outerRadius(radius * 0.8)
  .innerRadius(radius * 0.4);

var outerArc = d3.svg.arc()
  .innerRadius(radius * 0.9)
  .outerRadius(radius * 0.9);

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var key = function(d){ return d.data.label; };


function getData(data, compare, type, year) {
    var results = [];
    for (i = 0; i < data.length; i++) {
        if (data[i]["Survey year"] == year){
        results.push( { label: data[i][compare], value: data[i][type] })

 }
    }
    return results;
}

var color = d3.scale.ordinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

function sexCrimeData (){
  return getData(schoolData,'institution', 'burglary', $("input[name=year]").val());
}

change(sexCrimeData());

d3.select(".view")
  .on("click", function(){
    change(sexCrimeData());
  });


function change(data) {

  /* ------- PIE SLICES -------*/
  var slice = svg.select(".slices").selectAll("path.slice")
    .data(pie(data), key);

  slice.enter()
    .insert("path")
    .style("fill", function(d) { return color(d.data.label); })
    .attr("class", "slice");

  slice
    .transition().duration(1000)
    .attrTween("d", function(d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        return arc(interpolate(t));
      };
    })

  slice.exit()
    .remove();

  /* ------- TEXT LABELS -------*/

  var text = svg.select(".labels").selectAll("text")
    .data(pie(data), key);

  text.enter()
    .append("text")
    .attr("dy", ".35em")
    .text(function(d) {
      return d.data.label;
    });

  function midAngle(d){
    return d.startAngle + (d.endAngle - d.startAngle)/2;
  }

  text.transition().duration(1000)
    .attrTween("transform", function(d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        var d2 = interpolate(t);
        var pos = outerArc.centroid(d2);
        pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
        return "translate("+ pos +")";
      };
    })
    .styleTween("text-anchor", function(d){
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        var d2 = interpolate(t);
        return midAngle(d2) < Math.PI ? "start":"end";
      };
    });

  text.exit()
    .remove();

  /* ------- SLICE TO TEXT POLYLINES -------*/

  var polyline = svg.select(".lines").selectAll("polyline")
    .data(pie(data), key);

  polyline.enter()
    .append("polyline");

  polyline.transition().duration(1000)
    .attrTween("points", function(d){
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        var d2 = interpolate(t);
        var pos = outerArc.centroid(d2);
        pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
        return [arc.centroid(d2), outerArc.centroid(d2), pos];
      };
    });

  polyline.exit()
    .remove();
};





  });






schoolData= [
    {
        "Survey year": "2010",
        "id": "110565",
        "institution": "CSU-Fullerton",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "35590",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "2",
        "Sex offenses - Non-forcible": "0",
        "robbery": "1",
        "Aggravated assault": "11",
        "burglary": "10",
        "motorTheft": "10",
        "arson": "0"
    },



    {
        "Survey year": "2010",
        "id": "110583",
        "institution": "CSU-Long Beach",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "33416",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "2",
        "Sex offenses - Non-forcible": "0",
        "robbery": "1",
        "Aggravated assault": "2",
        "burglary": "14",
        "motorTheft": "10",
        "arson": "1"
    },
    {
        "Survey year": "2010",
        "id": "110608",
        "institution": "CSU-Northridge",
        "Campus ID": "1",
        " Campus Name": "CSU- Northridge",
        "Institution Size": "35272",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "9",
        "Sex offenses - Non-forcible": "0",
        "robbery": "4",
        "Aggravated assault": "1",
        "burglary": "47",
        "motorTheft": "11",
        "arson": "1"
    },
    {
        "Survey year": "2010",
        "id": "122409",
        "institution": "San Diego State University",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "29187",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "11",
        "Sex offenses - Non-forcible": "0",
        "robbery": "3",
        "Aggravated assault": "8",
        "burglary": "66",
        "motorTheft": "31",
        "arson": "5"
    },
    {
        "Survey year": "2010",
        "id": "122755",
        "institution": "San Jose State University",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "29076",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "2",
        "Sex offenses - Non-forcible": "0",
        "robbery": "6",
        "Aggravated assault": "2",
        "burglary": "36",
        "motorTheft": "16",
        "arson": "3"
    },

    {
        "Survey year": "2010",
        "id": "110635",
        "institution": "UC-Berkeley",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "35833",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "6",
        "Sex offenses - Non-forcible": "0",
        "robbery": "14",
        "Aggravated assault": "8",
        "burglary": "63",
        "motorTheft": "13",
        "arson": "9"
    },
    {
        "Survey year": "2010",
        "id": "110644",
        "institution": "UC-Davis",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "31392",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "14",
        "Sex offenses - Non-forcible": "0",
        "robbery": "1",
        "Aggravated assault": "4",
        "burglary": "71",
        "motorTheft": "9",
        "arson": "2"
    },

    {
        "Survey year": "2010",
        "id": "110662",
        "institution": "UC-Los Angeles",
        "Campus ID": "1",
        " Campus Name": "UCLA",
        "Institution Size": "38157",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "21",
        "Sex offenses - Non-forcible": "1",
        "robbery": "2",
        "Aggravated assault": "2",
        "burglary": "125",
        "motorTheft": "14",
        "arson": "2"
    },
    {
        "Survey year": "2011",
        "id": "110565",
        "institution": "CSU-Fullerton",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "36156",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "1",
        "Aggravated assault": "7",
        "burglary": "5",
        "motorTheft": "14",
        "arson": "0"
    },


    {
        "Survey year": "2011",
        "id": "110583",
        "institution": "CSU-Long Beach",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "34870",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "3",
        "Sex offenses - Non-forcible": "0",
        "robbery": "3",
        "Aggravated assault": "1",
        "burglary": "24",
        "motorTheft": "5",
        "arson": "0"
    },
    {
        "Survey year": "2011",
        "id": "110608",
        "institution": "CSU-Northridge",
        "Campus ID": "1",
        " Campus Name": "CSU- Northridge",
        "Institution Size": "36911",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "1",
        "Sex offenses - Non-forcible": "0",
        "robbery": "5",
        "Aggravated assault": "6",
        "burglary": "32",
        "motorTheft": "15",
        "arson": "0"
    },
    {
        "Survey year": "2011",
        "id": "122409",
        "institution": "San Diego State University",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "30541",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "6",
        "Sex offenses - Non-forcible": "0",
        "robbery": "2",
        "Aggravated assault": "4",
        "burglary": "42",
        "motorTheft": "39",
        "arson": "0"
    },
    {
        "Survey year": "2011",
        "id": "122755",
        "institution": "San Jose State University",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "30236",
        "Murder/Non-negligent manslaughter": "2",
        "Negligent manslaughter": "0",
        "sexOffenses": "3",
        "Sex offenses - Non-forcible": "0",
        "robbery": "2",
        "Aggravated assault": "13",
        "burglary": "24",
        "motorTheft": "13",
        "arson": "4"
    },

    {
        "Survey year": "2011",
        "id": "110635",
        "institution": "University of California-Berkeley",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "36137",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "30",
        "Sex offenses - Non-forcible": "1",
        "robbery": "9",
        "Aggravated assault": "7",
        "burglary": "40",
        "motorTheft": "14",
        "arson": "6"
    },
    {
        "Survey year": "2011",
        "id": "110644",
        "institution": "UC-Davis",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "31732",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "22",
        "Sex offenses - Non-forcible": "0",
        "robbery": "4",
        "Aggravated assault": "1",
        "burglary": "79",
        "motorTheft": "8",
        "arson": "1"
    },

    {
        "Survey year": "2011",
        "id": "110662",
        "institution": "UC-Los Angeles",
        "Campus ID": "1",
        " Campus Name": "UCLA",
        "Institution Size": "39271",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "8",
        "Sex offenses - Non-forcible": "0",
        "robbery": "2",
        "Aggravated assault": "4",
        "burglary": "118",
        "motorTheft": "7",
        "arson": "0"
    },
    {
        "Survey year": "2012",
        "id": "110565",
        "institution": "CSU-Fullerton",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "37677",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "1",
        "Aggravated assault": "5",
        "burglary": "8",
        "motorTheft": "15",
        "arson": "0"
    },


    {
        "Survey year": "2012",
        "id": "110583",
        "institution": "CSU-Long Beach",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "36279",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "1",
        "Sex offenses - Non-forcible": "1",
        "robbery": "0",
        "Aggravated assault": "1",
        "burglary": "23",
        "motorTheft": "8",
        "arson": "1"
    },
    {
        "Survey year": "2012",
        "id": "110608",
        "institution": "CSU-Northridge",
        "Campus ID": "1",
        " Campus Name": "CSU- Northridge",
        "Institution Size": "36164",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "7",
        "Sex offenses - Non-forcible": "0",
        "robbery": "6",
        "Aggravated assault": "3",
        "burglary": "23",
        "motorTheft": "11",
        "arson": "2"
    },
    {
        "Survey year": "2012",
        "id": "122409",
        "institution": "San Diego State University",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "30843",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "12",
        "Sex offenses - Non-forcible": "0",
        "robbery": "11",
        "Aggravated assault": "6",
        "burglary": "45",
        "motorTheft": "8",
        "arson": "0"
    },
    {
        "Survey year": "2012",
        "id": "122755",
        "institution": "San Jose State University",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "30448",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "3",
        "Sex offenses - Non-forcible": "0",
        "robbery": "9",
        "Aggravated assault": "6",
        "burglary": "29",
        "motorTheft": "9",
        "arson": "1"
    },

    {
        "Survey year": "2012",
        "id": "110635",
        "institution": "UC-Berkeley",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "35893",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "13",
        "Sex offenses - Non-forcible": "1",
        "robbery": "18",
        "Aggravated assault": "4",
        "burglary": "69",
        "motorTheft": "9",
        "arson": "3"
    },
    {
        "Survey year": "2012",
        "id": "110644",
        "institution": "UC-Davis",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "32354",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "15",
        "Sex offenses - Non-forcible": "0",
        "robbery": "1",
        "Aggravated assault": "5",
        "burglary": "45",
        "motorTheft": "5",
        "arson": "5"
    },
    {
        "Survey year": "2012",
        "id": "110662",
        "institution": "UC-Los Angeles",
        "Campus ID": "1",
        " Campus Name": "UCLA",
        "Institution Size": "39945",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "15",
        "Sex offenses - Non-forcible": "0",
        "robbery": "5",
        "Aggravated assault": "1",
        "burglary": "76",
        "motorTheft": "6",
        "arson": "1"
    },
    {
        "Survey year": "2013",
        "id": "110565",
        "institution": "CSU-Fullerton",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "38325",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "4",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "1",
        "burglary": "2",
        "motorTheft": "9",
        "arson": "0"
    },


    {
        "Survey year": "2013",
        "id": "110583",
        "institution": "CSU-Long Beach",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "35586",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "3",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "2",
        "burglary": "28",
        "motorTheft": "23",
        "arson": "0"
    },
    {
        "Survey year": "2013",
        "id": "110608",
        "institution": "CSU-Northridge",
        "Campus ID": "1",
        " Campus Name": "CSU- Northridge",
        "Institution Size": "38310",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "6",
        "Sex offenses - Non-forcible": "0",
        "robbery": "1",
        "Aggravated assault": "3",
        "burglary": "29",
        "motorTheft": "11",
        "arson": "2"
    },
    {
        "Survey year": "2013",
        "id": "122409",
        "institution": "San Diego State University",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "31899",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "6",
        "Sex offenses - Non-forcible": "0",
        "robbery": "3",
        "Aggravated assault": "3",
        "burglary": "47",
        "motorTheft": "20",
        "arson": "1"
    },
    {
        "Survey year": "2013",
        "id": "122755",
        "institution": "San Jose State University",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "31278",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "5",
        "Aggravated assault": "4",
        "burglary": "14",
        "motorTheft": "6",
        "arson": "1"
    },

    {
        "Survey year": "2013",
        "id": "110635",
        "institution": "UC-Berkeley",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "36198",
        "Murder/Non-negligent manslaughter": "1",
        "Negligent manslaughter": "0",
        "sexOffenses": "13",
        "Sex offenses - Non-forcible": "0",
        "robbery": "16",
        "Aggravated assault": "14",
        "burglary": "56",
        "motorTheft": "11",
        "arson": "3"
    },
    {
        "Survey year": "2013",
        "id": "110644",
        "institution": "UC-Davis",
        "Campus ID": "1",
        " Campus Name": "Main Campus",
        "Institution Size": "33307",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "14",
        "Sex offenses - Non-forcible": "0",
        "robbery": "2",
        "Aggravated assault": "6",
        "burglary": "40",
        "motorTheft": "4",
        "arson": "2"
    },
    {
        "Survey year": "2013",
        "id": "110662",
        "institution": "UC-Los Angeles",
        "Campus ID": "1",
        " Campus Name": "UCLA",
        "Institution Size": "40795",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "33",
        "Sex offenses - Non-forcible": "0",
        "robbery": "2",
        "Aggravated assault": "7",
        "burglary": "75",
        "motorTheft": "11",
        "arson": "1"
    },
];






























