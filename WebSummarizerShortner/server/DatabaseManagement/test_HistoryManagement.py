import unittest
from unittest.mock import patch, MagicMock
from HistoryManagement import UserHistoryManagement  # Adjust the import path as needed

class TestUserHistoryManagement(unittest.TestCase):

    def setUp(self):
        self.patcher_connect = patch('HistoryManagement.psycopg2.connect')
        self.mock_connect = self.patcher_connect.start()
        self.mock_conn = MagicMock()
        self.mock_cursor = MagicMock()
        self.mock_connect.return_value = self.mock_conn
        self.mock_conn.cursor.return_value = self.mock_cursor

    def tearDown(self):
        self.patcher_connect.stop()

    def test_insert_history_success(self):
        self.history_manager = UserHistoryManagement()
        self.mock_cursor.execute.return_value = None
        self.mock_conn.commit.return_value = None

        try:
            self.history_manager.insertHistory("input", "summarized", "username")
            success = True
        except Exception as e:
            success = False

        self.assertTrue(success)
        self.mock_cursor.execute.assert_called()
        self.mock_conn.commit.assert_called()

    def test_insert_history_error(self):
        self.history_manager = UserHistoryManagement()
        self.mock_cursor.execute.side_effect = Exception("DB error")

        with self.assertRaises(Exception):
            self.history_manager.insertHistory("input", "summarized", "username")

    def test_retrieve_history_success(self):
        self.history_manager = UserHistoryManagement()
        self.mock_cursor.fetchall.return_value = [("1", "input", "summarized")]

        history = self.history_manager.retrieveHistory("username")
        self.assertEqual(len(history), 1)

    def test_retrieve_history_error(self):
        self.history_manager = UserHistoryManagement()
        self.mock_cursor.execute.side_effect = Exception("DB error")

        with self.assertRaises(Exception):
            self.history_manager.retrieveHistory("username")

    def test_delete_history_success(self):
        self.history_manager = UserHistoryManagement()
        self.mock_cursor.rowcount = 1

        status = self.history_manager.deleteHistory("username", None)
        self.assertEqual(status, "success")

if __name__ == '__main__':
    unittest.main()