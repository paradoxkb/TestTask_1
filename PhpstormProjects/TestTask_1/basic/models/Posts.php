<?php
/**
 * Created by PhpStorm.
 * User: watcher
 * Date: 12/8/16
 * Time: 11:04 AM
 */

namespace app\models;
use Yii;
use yii\base\Model;
use yii\db;

class Posts extends Model {

    public function getPosts () {
        $posts = Yii::$app->db->createCommand('SELECT * FROM posts')->queryAll();
        return $posts;
    }

    public function insertPost ($post) {
        $insert = Yii::$app->db->createCommand()->insert('posts', [
            'id' => $post['id'],
            'title' => $post['title'],
            'text' => $post['text'],
        ])->execute();
        if(!$insert) {
            return array('Failed insert post');
        } else {
            return array('Post was inserted');
        }
    }

    public function savePost ($target, $post) {
        $save = Yii::$app->db->createCommand()->update('posts', [
            'title' => $post['title'],
            'text' => $post['text']
        ], 'id = '.$target)->execute();
        if(!$save) {
            return array('Save remove');
        } else {
            return array('Success save');
        }
    }

    public function removePost ($target) {
        $remove = Yii::$app->db->createCommand()->delete('posts', 'id = '.$target)->execute();
        if(!$remove) {
            return array('Failed remove');
        } else {
            return array('Success remove');
        }
    }
}