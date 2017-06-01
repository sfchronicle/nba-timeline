var statsData = [{"id":0,"years":2007,"season":"2007-2008","w_wins":48,"c_wins":45,"w_score":"48-34","c_score":"45-37","w_text":"A year after \"We Believe\" Warriors ended a run of 12 non-playoff seasons with 42 wins, Golden State finished ninth in West despite 48 wins, which were more than all but three teams in the East.","c_text":"A year after getting swept by the Spurs in the NBA Finals, Cavs regress and lose in Eastern Conference semifinals."},{"id":1,"years":2008,"season":"2008-2009","w_wins":29,"c_wins":66,"w_score":"29-53","c_score":"66-16","w_text":"Baron Davis signs with the Clippers and the Warriors slip to the 10th in the West.","c_text":"LeBron James wins first MVP, Mike Brown is coach of the year and Cavs set franchise record for wins only to lose to Magic in East finals."},{"id":2,"years":2009,"season":"2009-2010","w_wins":26,"c_wins":61,"w_score":"26-56","c_score":"61-21","w_text":"Co-Rookie of the year Stephen Curry averages 17.5 points per game. Injuries take a toll as Warriors finish 13th in the West.","c_text":"Another MVP for James, another loss in East semifinals."},{"id":3,"years":2010,"season":"2010-2011","w_wins":36,"c_wins":19,"w_score":"36-46","c_score":"19-63","w_text":"Ten-game improvement still leaves the Warriors 12th in the rugged West.","c_text":"Without James, who left for Miami, Cavs finish last in East and second worst in NBA."},{"id":4,"years":2011,"season":"2011-2012","w_wins":23,"c_wins":21,"w_score":"23-43","c_score":"21-45","w_text":"With Curry playing only 26 games after his second major ankle injury, the Warriors trade Monta Ellis and bench David Lee. They lose 17 of their final 20 games and get to keep their lottery pick, which was only protected if it was in the top eight.","c_text":"Kyrie Irving averages team-high 18.5 points in 51 games to win Rookie of the Year."},{"id":5,"years":2012,"season":"2012-2013","w_wins":47,"c_wins":24,"w_score":"47-35","c_score":"24-58","w_text":"With a starting lineup of Curry, Thompson, Bogut, Lee and Barnes, Warriors return to the playoffs, beating Denver in the first round before losing to the Spurs in six.","c_text":"Team with future Warriors Anderson Varejao, Shaun Livingston, Marreese Speights and Luke Walton finishes with league's third-worst record."},{"id":6,"years":2013,"season":"2013-2014","w_wins":51,"c_wins":33,"w_score":"51-31","c_score":"33-49","w_text":"First 50-win season since 1993-94 earns Warriors the sixth seed in the playoffs. But a late-season injury to Bogut proves costly in a first-round loss to the Clippers.","c_text":"With Brown back as coach, Cavs finish 5 games behind Hawks for 8th playoff spot."},{"id":7,"years":2014,"season":"2014-2015","w_wins":67,"c_wins":53,"w_score":"67-15","c_score":"53-29","w_text":"Curry wins the MVP, the Warriors set a franchise record for wins and they cruise through the playoffs with a 16-5 record, beating Cavs in six games for their first NBA title since 1974-75 season.","c_text":"Limited to 69 games by injuries in his return to Cleveland, James leads Cavs to second seed in East."},{"id":8,"years":2015,"season":"2015-2016","w_wins":73,"c_wins":57,"w_score":"73-9","c_score":"57-25","w_text":"A season-opening 24-game win streak, an NBA record 73 wins, Curry's 402 three-pointers and unanimous MVP selection all wiped out when they blow a 3-1 series lead to the Cavs in a Finals rematch.","c_text":"Cavs finish 16 games behind Warriors in regular season and fall behind 3-1 in Finals rematch before storming back."},{"id":9,"years":2016,"season":"2016-2017","w_wins":67,"c_wins":51,"w_score":"67-15","c_score":"51-31","w_text":"Integrating Kevin Durant along with a re-made bench, the Warriors still post the best record in the NBA. They go 12-0 in the first three rounds of the playoffs to set up Round 3 with the Cavs.","c_text":"Looking old and vunerable at times in the regular season, Cavs get the No. 2 seed in the East."}];

// fills in HTML for year as years toggle
var updateInfo = function(data) {
  document.querySelector("#season").innerHTML = "<div class='season'>"+data.season+'</div>';
  document.querySelector("#warriors-fact").innerHTML = "<div class='score warscore'>Warriors: "+data.w_score+'</div>'+"<div class='desc'>"+data.w_text+'</div>';
  document.querySelector("#cavs-fact").innerHTML = "<div class='score cavscore'>Cavaliers: "+data.c_score+'</div>'+"<div class='desc'>"+data.c_text+'</div>';
};

// color by year function
function color_by_team(team) {
  if (team == "warriors") {
    return "#006BB6";
  } else if (team == "cavs"){
    return "#860038";
  }
}

// setting sizes of interactive
var margin = {
  top: 0,
  right: 50,
  bottom: 50,
  left: 30
};
if (screen.width > 768) {
  var width = 900 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;
} else if (screen.width <= 768 && screen.width > 480) {
  var width = 720 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;
} else if (screen.width <= 480 && screen.width > 340) {
  console.log("big phone");
  var margin = {
    top: 20,
    right: 50,
    bottom: 40,
    left: 30
  };
  var width = 340 - margin.left - margin.right;
  var height = 350 - margin.top - margin.bottom;
} else if (screen.width <= 340) {
  console.log("mini iphone")
  var margin = {
    top: 20,
    right: 30,
    bottom: 40,
    left: 20
  };
  var width = 310 - margin.left - margin.right;
  var height = 350 - margin.top - margin.bottom;
}

var	parseYr = d3.timeParse("%Y");

// create SVG container for chart components
var svgNBA = d3.select("#line-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var g = svgNBA.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]);

x.domain([parseYr(2007),parseYr(2016)]);
y.domain([0,80]);

var lineWarriors = d3.line()
    .x(function(d) {
      return x(parseYr(+d.years));
    })
    .y(function(d) {
      return y(+d.w_wins);
    });
var lineCavs = d3.line()
    .x(function(d) {
      return x(parseYr(+d.years));
    })
    .y(function(d) {
      return y(+d.c_wins);
    });

if (screen.width <= 480) {
  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)
        .ticks(5))
      .append("text")
        .text("Season")
    .select(".domain")
      .remove()
} else {
  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .append("text")
        .text("Season")
    .select(".domain")
      .remove()
}

// Add the filled area
g.append("path")
    .datum(statsData)
    .attr("class","thicklines")
    .style("stroke",color_by_team("warriors"))
    .attr("d", lineWarriors);

// Add the filled area
g.append("path")
    .datum(statsData)
    .attr("class","thicklines")
    .style("stroke",color_by_team("cavs"))
    .attr("d", lineCavs);

// define the area
var areaWAR = d3.area()
   .x(function(d) { return x(parseYr(+d.years)); })
   .y0(height)
   .y1(function(d) { return y(+d.w_wins); });

function areaTweenWAR() {
  var interpolate = d3.scaleQuantile()
    .domain([0,1])
    .range(d3.range(1, statsData.length + 1));
  return function(t) {
    return areaWAR(statsData.slice(0, interpolate(t)));
  };
}

// define the area
var areaCAV = d3.area()
   .x(function(d) { return x(parseYr(+d.years)); })
   .y0(height)
   .y1(function(d) { return y(+d.c_wins); });

function areaTweenCAV() {
  var interpolate = d3.scaleQuantile()
    .domain([0,1])
    .range(d3.range(1, statsData.length + 1));
  return function(t) {
    return areaCAV(statsData.slice(0, interpolate(t)));
  };
}

// draw dots
var nodes = g.selectAll(".dot")
    .data(statsData)
  .enter().append("g")
    .attr("class","node");

nodes.append("circle")
    .attr("class", "cavDot")
    .attr("r", 5)
    .attr("fill",color_by_team("cavs"))
    .attr("cx", function(d) { return x(parseYr(+d.years)); })
    .attr("cy", function(d) { return y(+d.c_wins); })

nodes.append("circle")
    .attr("class", "warDot")
    .attr("r", 5)
    .attr("fill",color_by_team("warriors"))
    .attr("cx", function(d) { return x(parseYr(+d.years)); })
    .attr("cy", function(d) { return y(+d.w_wins); })

nodes.append("text")
  .attr("dx", function(d) { return x(parseYr(+d.years))-15; })
  .attr("dy", function(d) { return y(+d.c_wins)+20; })
  .attr("fill",color_by_team("cavs"))
  .text(function(d){
    return d.c_score;
  });

nodes.append("text")
  .attr("dx", function(d) { return x(parseYr(+d.years))-15; })
  .attr("dy", function(d) { return y(+d.w_wins)-20; })
  .attr("fill",color_by_team("warriors"))
  .text(function(d){
    return d.w_score;
  });

var years = [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
var i = 0;
var tempData;
var tick = function() {
  updateInfo(statsData[i]);

  tempData = statsData.slice(0,i+1);
  d3.select("#warriors_area").remove();
  d3.select("#cavs_area").remove();
  g.append("path")
     .data([tempData])
     .attr("id","warriors_area")
     .attr("fill",color_by_team("warriors"))
     .attr("opacity","0.2")
     .attr("d", areaWAR);

   g.append("path")
      .data([tempData])
      .attr("id","cavs_area")
      .attr("fill",color_by_team("cavs"))
      .attr("opacity","0.2")
      .attr("d", areaCAV);
};

tick();

window.onscroll = function() {activate()};

function activate() {

  var sticker = document.getElementById('stick-me');
  var sticker_ph = document.getElementById('stick-ph');
  var window_top = document.body.scrollTop;
  var sticker_stop = document.getElementById('stop-stick-here').getBoundingClientRect().top + window_top-500;
  var div_top = document.getElementById('stick-here').getBoundingClientRect().top + window_top;

  if ((window_top > div_top) && (window_top < sticker_stop)) {
    sticker.classList.add('fixed-class');
    sticker_ph.style.height = "2000px";
    sticker_ph.style.display = 'block'; // puts in a placeholder for where sticky used to be for smooth scrolling
  } else {
    sticker.classList.remove('fixed-class');
    sticker_ph.style.display = 'none'; // removes placeholder
  }

  currentPosition = getPageScroll();
  if (screen.width <= 480) {
    i = Math.floor(currentPosition/2000*10)-1;
  } else {
    i = Math.floor(currentPosition/2000*10);
  }
  console.log(i);
  if (i < 10 && i > -1) {
    tick();
  }
}


// desktop scrolling controls ----------------------------------------------------------------

function getPageScroll() {
  var yScroll;

  if (window.pageYOffset) {
    yScroll = window.pageYOffset;
  } else if (document.documentElement && document.documentElement.scrollTop) {
    yScroll = document.documentElement.scrollTop;
  } else if (document.body) {
    yScroll = document.body.scrollTop;
  }
  return yScroll;
}


// mobile swiping controls --------------------------------------------------------------------

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        // if ( xDiff > 0 ) {
        //     /* left swipe */
        // } else {
        //     /* right swipe */
        // }
    } else {
        if ( yDiff > 0 ) {
          // up swipe
          i = i+1;
          // filling in slide
          tick();
        } else {
          // down swipe
          i = i-1;
          // filling in slide
          tick();
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};