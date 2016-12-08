<?php
/**
 * Created by PhpStorm.
 * User: watcher
 * Date: 12/8/16
 * Time: 10:39 AM
 */
namespace app\controllers;

use yii\rest\ActiveController;
use app\models\Posts;

class PostsController extends ActiveController {
    public $modelClass = 'app\models\Posts';

    public function actionGetposts () {
        $model = new Posts();
        $result = $model->getPosts();
        echo json_encode($result);
    }

    public function actionSave() {
        $model = new Posts();
        $result = $model->savePost($_POST['target'], $_POST['newObject']);
        echo json_encode($result);
    }

    public function actionInsert() {
        $model = new Posts();
        $result = $model->insertPost($_POST['newObject']);
        echo json_encode($result);
    }

    public function actionRemove() {
        $model = new Posts();
        $result = $model->removePost($_POST['target']);
        echo json_encode($result);
    }
//    public function actionFind() {
//        $model = new Posts();
//        $query = $model->find();
//        echo json_encode($query);
//    }
}