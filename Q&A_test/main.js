$(document).ready(function(){
    let currentQuiz = null;
    $("#startButton").click(function(){  // "#"!!!!!!!
        if(currentQuiz == null){
            // 第一次的題目
            currentQuiz = 0;
            $("#question").text(questions[0].question);
            // 清空
            $("#options").empty();
            for(let x = 0; x < questions[0].answers.length; x++){
                $("#options").append(
                    "<input name = 'options' type = 'radio' value = " +
                    x + ">" + 
                    "<label>" + questions[0].answers[x][0] +
                    "</label><br><br>"
                );
            }
            $("#startButton").attr("value", "下一題");
        }
        else{
            // 尋訪選項是否被選取
            $.each(
                $(":radio"), function(i, val){
                    if(val.checked){
                         // 最後一次
                        if(isNaN(questions[currentQuiz].answers[i][1])){
                            let finalResult = questions[currentQuiz].answers[i][1];
                            $("#question").text(finalAnswers[finalResult[0]].slice(0, 1));
                            $("#options").empty();
                            $("#options").append(finalAnswers[finalResult][1] + "<br><br>");
                            currentQuiz = null;
                            $("#startButton").attr("value", "重新開始");
                        }
                        else{
                            // next
                            currentQuiz = questions[currentQuiz].answers[i][1]-1;
                            $("#question").text(questions[currentQuiz].question);
                            $("#options").empty();
                            for(let x=0;x<questions[currentQuiz].answers.length;x++){
                                $("#options").append(
                                    "<input name='options' type='radio' value="+
                                    x+">"+
                                    "<label>"+questions[currentQuiz].answers[x][0]+
                                    "</label><br><br>"
                                );
                            }
                        }
                        return false;
                    }
                }
            );
        }
    });

});