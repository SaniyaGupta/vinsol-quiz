import React from 'react';
import './App.css';
import { Button, Input, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import { logic } from './logic';

class Quiz extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            totalScore: 0,
            questionList: [],
            questionToDisplay: '',
            screenToDisplay: 'startQuiz'
        };
    }
    return
    onNextClick = () => {
        const question = logic.getQuestion();
        const lastQuestion = this.state.questionList[this.state.questionList.length - 1];
        let totalScore = this.state.totalScore;
        if (lastQuestion && lastQuestion.answer == lastQuestion.expectedAnswer) {
            totalScore = totalScore + 1;
        }
        const questionList = [...this.state.questionList, question];
        this.setState({ questionList, screenToDisplay: 'showQuestion', questionToDisplay: question.question, totalScore })

    }

    handleAnswerChange = (e) => {
        const questionList = JSON.parse(JSON.stringify(this.state.questionList))
        questionList[questionList.length - 1].answer = e.target.value;
        this.setState({ questionList })

    }
    onSubmit = () => {
        const lastQuestion = this.state.questionList[this.state.questionList.length - 1];
        let totalScore = this.state.totalScore;
        if (lastQuestion && lastQuestion.answer == lastQuestion.expectedAnswer) {
            totalScore = totalScore + 1;
        }
        this.setState({ totalScore, screenToDisplay: 'showAnswers' })
    }
    renderQuizQuestion() {
        return (
            <div >
                Question{this.state.questionList.length}
                <div style={{ display: 'flex', margin: '20px', alignItems: 'center' }}> {`${this.state.questionToDisplay}   =   `}
                    <Input style={{ marginLeft: '10px', width: '100px' }}
                        id="outlined-bare"
                        variant="outlined"
                        placeholder="Type Answer"
                        value={this.state.questionList[this.state.questionList.length - 1].answer ? this.state.questionList[this.state.questionList.length - 1].answer : ''}
                        onChange={e => { this.handleAnswerChange(e) }}
                    />
                </div>
                <div style={{ margin: '20px', display: 'flex', justifyContent: 'space-between', position: 'fixed', bottom: 0, width: '45%' }}>
                    <div>
                        Score : {this.state.totalScore} out of {this.state.questionList.length}
                    </div>
                    {this.state.questionList.length < 20 ?
                        <Button variant="contained" color="primary" onClick={this.onNextClick}>
                            Next
                            </Button>
                        :
                        <Button variant="contained" color="primary" onClick={this.onSubmit}>
                            Submit
                         </Button>}
                </div>
            </div>
        )
    }
    showFinalResult() {
        return (
            <div>
                Score : {this.state.totalScore} out of {this.state.questionList.length}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell>Given Answer</TableCell>
                            <TableCell>Correct Answer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.questionList.map((row, index) => (
                            <TableRow style={{ backgroundColor: row.answer != row.expectedAnswer ? 'red' : 'none' }} key={index}>
                                <TableCell>{row.question}</TableCell>
                                <TableCell>{row.answer}</TableCell>
                                <TableCell>{row.expectedAnswer}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }
    render() {
        return (
            <div className="Quiz">
                {this.state.screenToDisplay === 'startQuiz' && <Button onClick={this.onNextClick} variant="contained" color="primary" >
                    Start Quiz
            </Button>}
                {this.state.screenToDisplay === 'showQuestion' && this.renderQuizQuestion()}
                {this.state.screenToDisplay === 'showAnswers' && this.showFinalResult()}
            </div>
        )
    }
}
export default Quiz;
