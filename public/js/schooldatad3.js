$(document).ready(function() {

var dispatch = d3.dispatch("load", "schoolchange");

var groups = [
  "burglary",
  "robbery",
  "sexOffenses",
  "arson",
];


d3.csv("schooldata.csv", type, function(error, schools) {
  // if (error) throw error;
  var schoolById = d3.map();
  schools.forEach(function(d) { schoolById.set(d.id, d); });
  dispatch.load(schoolById);
  dispatch.schoolchange(schoolById.get("UCLA"));
});

// A drop-down menu for selecting a state; uses the "menu" namespace.
dispatch.on("load.menu", function(schoolById) {
  var select = d3.select("body")
    .append("div")
    .append("select")
      .on("change", function() { dispatch.schoolchange(schoolById.get(this.value)); });

  select.selectAll("option")
      .data(schoolById.values())
    .enter().append("option")
      .attr("value", function(d) { return d.id; })
      .text(function(d) { return d.id; });

  dispatch.on("schoolchange.menu", function(school) {
    select.property("value", school.id);
  });
});

// A bar chart to show total population; uses the "bar" namespace.
dispatch.on("load.bar", function(schoolById) {
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 80 - margin.left - margin.right,
      height = 460 - margin.top - margin.bottom;

  var y = d3.scale.linear()
      .domain([0, d3.max(schoolById.values(), function(d) { return d.total; })])
      .rangeRound([height, 0])
      .nice();

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  var rect = svg.append("rect")
      .attr("x", 4)
      .attr("width", width - 4)
      .attr("y", height)
      .attr("height", 0)
      .style("fill", "#aaa");

  dispatch.on("schoolchange.bar", function(d) {
    rect.transition()
        .attr("y", y(d.total))
        .attr("height", y(0) - y(d.total));
  });
});

// A pie chart to show population by age group; uses the "pie" namespace.
dispatch.on("load.pie", function(schoolById) {
  var width = 880,
      height = 460,
      radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
      .domain(groups)
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 70);

  var pie = d3.layout.pie()
      .sort(null);

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var path = svg.selectAll("path")
      .data(groups)
      .enter().append("path")
      .style("fill", color)
      .each(function() { this._current = {startAngle: 0, endAngle: 0}; });

  dispatch.on("schoolchange.pie", function(d) {
    path.data(pie.value(function(g) { return d[g]; })(groups)).transition()
        .attrTween("d", function(d) {
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function(t) {
            return arc(interpolate(t));
          };
        });
  });
});

// Coerce crime counts to numbers and compute total per school.
function type(d) {
  d.total = d3.sum(groups, function(k) { return d[k] = +d[k]; });
  return d;
}





});



schools = [
    {
        "Survey year": "2010",
        "Unitid": "110565",
        "institution": "California State University-Fullerton",
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
        "Unitid": "110565",
        "institution": "California State University-Fullerton",
        "Campus ID": "3",
        " Campus Name": "Zzyzx",
        "Institution Size": "35590",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "0",
        "burglary": "0",
        "motorTheft": "0",
        "arson": "0"
    },
    {
        "Survey year": "2010",
        "Unitid": "110565",
        "institution": "California State University-Fullerton",
        "Campus ID": "4",
        " Campus Name": "Santa Ana Central Arts",
        "Institution Size": "35590",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "0",
        "burglary": "0",
        "motorTheft": "0",
        "arson": "0"
    },
    {
        "Survey year": "2010",
        "Unitid": "110565",
        "institution": "California State University-Fullerton",
        "Campus ID": "5",
        " Campus Name": "Irvine Campus",
        "Institution Size": "35590",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "0",
        "burglary": "0",
        "motorTheft": "0",
        "arson": "0"
    },
    {
        "Survey year": "2010",
        "Unitid": "110583",
        "institution": "California State University-Long Beach",
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
        "Unitid": "110608",
        "institution": "California State University-Northridge",
        "Campus ID": "1",
        " Campus Name": "California State University- Northridge",
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
        "Unitid": "122409",
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
        "Unitid": "122755",
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
        "Unitid": "122755",
        "institution": "San Jose State University",
        "Campus ID": "2",
        " Campus Name": "Moss Landing Marine Laboratory",
        "Institution Size": "29076",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "0",
        "burglary": "0",
        "motorTheft": "0",
        "arson": "0"
    },
    {
        "Survey year": "2010",
        "Unitid": "110635",
        "institution": "University of California-Berkeley",
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
        "Unitid": "110644",
        "institution": "University of California-Davis",
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
        "Unitid": "110644",
        "institution": "University of California-Davis",
        "Campus ID": "2",
        " Campus Name": "UC Davis Medical Center",
        "Institution Size": "31392",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "Sex_offenses - Forcible": "5",
        "Sex offenses - Non-forcible": "0",
        "robbery": "1",
        "Aggravated assault": "2",
        "burglary": "4",
        "motorTheft": "2",
        "arson": "0"
    },
    {
        "Survey year": "2010",
        "Unitid": "110662",
        "institution": "University of California-Los Angeles",
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
        "Unitid": "110565",
        "institution": "California State University-Fullerton",
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
        "Unitid": "110565",
        "institution": "California State University-Fullerton",
        "Campus ID": "3",
        " Campus Name": "Zzyzx",
        "Institution Size": "36156",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "0",
        "burglary": "0",
        "motorTheft": "0",
        "arson": "0"
    },
    {
        "Survey year": "2011",
        "Unitid": "110565",
        "institution": "California State University-Fullerton",
        "Campus ID": "4",
        " Campus Name": "Santa Ana Central Arts",
        "Institution Size": "36156",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "0",
        "burglary": "1",
        "motorTheft": "0",
        "arson": "0"
    },
    {
        "Survey year": "2011",
        "Unitid": "110565",
        "institution": "California State University-Fullerton",
        "Campus ID": "5",
        " Campus Name": "Irvine Campus",
        "Institution Size": "36156",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "0",
        "burglary": "0",
        "motorTheft": "0",
        "arson": "0"
    },
    {
        "Survey year": "2011",
        "Unitid": "110583",
        "institution": "California State University-Long Beach",
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
        "Unitid": "110608",
        "institution": "California State University-Northridge",
        "Campus ID": "1",
        " Campus Name": "California State University- Northridge",
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
        "Unitid": "122409",
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
        "Unitid": "122755",
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
        "Unitid": "122755",
        "institution": "San Jose State University",
        "Campus ID": "2",
        " Campus Name": "Moss Landing Marine Laboratory",
        "Institution Size": "30236",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "0",
        "burglary": "0",
        "motorTheft": "0",
        "arson": "0"
    },
    {
        "Survey year": "2011",
        "Unitid": "110635",
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
        "Unitid": "110644",
        "institution": "University of California-Davis",
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
        "Unitid": "110644",
        "institution": "University of California-Davis",
        "Campus ID": "2",
        " Campus Name": "UC Davis Medical Center",
        "Institution Size": "31732",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "2",
        "Sex offenses - Non-forcible": "0",
        "robbery": "1",
        "Aggravated assault": "3",
        "burglary": "7",
        "motorTheft": "5",
        "arson": "0"
    },
    {
        "Survey year": "2011",
        "Unitid": "110662",
        "institution": "University of California-Los Angeles",
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
        "Unitid": "110565",
        "institution": "California State University-Fullerton",
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
        "Unitid": "110565",
        "institution": "California State University-Fullerton",
        "Campus ID": "3",
        " Campus Name": "Zzyzx",
        "Institution Size": "37677",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "0",
        "burglary": "0",
        "motorTheft": "0",
        "arson": "0"
    },
    {
        "Survey year": "2012",
        "Unitid": "110565",
        "institution": "California State University-Fullerton",
        "Campus ID": "4",
        " Campus Name": "Santa Ana Central Arts",
        "Institution Size": "37677",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "0",
        "burglary": "1",
        "motorTheft": "0",
        "arson": "0"
    },
    {
        "Survey year": "2012",
        "Unitid": "110565",
        "institution": "California State University-Fullerton",
        "Campus ID": "5",
        " Campus Name": "Irvine Campus",
        "Institution Size": "37677",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "0",
        "burglary": "0",
        "motorTheft": "0",
        "arson": "0"
    },
    {
        "Survey year": "2012",
        "Unitid": "110583",
        "institution": "California State University-Long Beach",
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
        "Unitid": "110608",
        "institution": "California State University-Northridge",
        "Campus ID": "1",
        " Campus Name": "California State University- Northridge",
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
        "Unitid": "122409",
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
        "Unitid": "122755",
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
        "Unitid": "122755",
        "institution": "San Jose State University",
        "Campus ID": "2",
        " Campus Name": "Moss Landing Marine Laboratory",
        "Institution Size": "30448",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "0",
        "burglary": "0",
        "motorTheft": "0",
        "arson": "0"
    },
    {
        "Survey year": "2012",
        "Unitid": "110635",
        "institution": "University of California-Berkeley",
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
        "Unitid": "110644",
        "institution": "University of California-Davis",
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
        "Unitid": "110644",
        "institution": "University of California-Davis",
        "Campus ID": "2",
        " Campus Name": "UC Davis Medical Center",
        "Institution Size": "32354",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "2",
        "Sex offenses - Non-forcible": "0",
        "robbery": "2",
        "Aggravated assault": "3",
        "burglary": "6",
        "motorTheft": "8",
        "arson": "0"
    },
    {
        "Survey year": "2012",
        "Unitid": "110662",
        "institution": "University of California-Los Angeles",
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
        "Unitid": "110565",
        "institution": "California State University-Fullerton",
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
        "Unitid": "110565",
        "institution": "California State University-Fullerton",
        "Campus ID": "3",
        " Campus Name": "Zzyzx",
        "Institution Size": "38325",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "0",
        "burglary": "0",
        "motorTheft": "0",
        "arson": "0"
    },
    {
        "Survey year": "2013",
        "Unitid": "110565",
        "institution": "California State University-Fullerton",
        "Campus ID": "4",
        " Campus Name": "Santa Ana Central Arts",
        "Institution Size": "38325",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "0",
        "burglary": "0",
        "motorTheft": "0",
        "arson": "0"
    },
    {
        "Survey year": "2013",
        "Unitid": "110565",
        "institution": "California State University-Fullerton",
        "Campus ID": "5",
        " Campus Name": "Irvine Campus",
        "Institution Size": "38325",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "0",
        "burglary": "0",
        "motorTheft": "0",
        "arson": "0"
    },
    {
        "Survey year": "2013",
        "Unitid": "110565",
        "institution": "California State University-Fullerton",
        "Campus ID": "6",
        " Campus Name": "Garden Grove Campus",
        "Institution Size": "38325",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "0",
        "burglary": "0",
        "motorTheft": "0",
        "arson": "0"
    },
    {
        "Survey year": "2013",
        "Unitid": "110583",
        "institution": "California State University-Long Beach",
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
        "Unitid": "110608",
        "institution": "California State University-Northridge",
        "Campus ID": "1",
        " Campus Name": "California State University- Northridge",
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
        "Unitid": "122409",
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
        "Unitid": "122755",
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
        "Unitid": "122755",
        "institution": "San Jose State University",
        "Campus ID": "2",
        " Campus Name": "Moss Landing Marine Laboratory",
        "Institution Size": "31278",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "0",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "0",
        "burglary": "0",
        "motorTheft": "0",
        "arson": "0"
    },
    {
        "Survey year": "2013",
        "Unitid": "110635",
        "institution": "University of California-Berkeley",
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
        "Unitid": "110644",
        "institution": "University of California-Davis",
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
        "Unitid": "110644",
        "institution": "University of California-Davis",
        "Campus ID": "2",
        " Campus Name": "UC Davis Medical Center",
        "Institution Size": "33307",
        "Murder/Non-negligent manslaughter": "0",
        "Negligent manslaughter": "0",
        "sexOffenses": "3",
        "Sex offenses - Non-forcible": "0",
        "robbery": "0",
        "Aggravated assault": "0",
        "burglary": "4",
        "motorTheft": "2",
        "arson": "0"
    },
    {
        "Survey year": "2013",
        "Unitid": "110662",
        "institution": "University of California-Los Angeles",
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





