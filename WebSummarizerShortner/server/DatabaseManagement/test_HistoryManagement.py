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
        # Set a default fetchone response that is appropriate for count queries
        self.mock_cursor.fetchone.return_value = (0,)

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
            print(f"Error during test: {e}")  # Print out the error if any

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

        status = self.history_manager.deleteHistory("username", "1")
        self.assertEqual(status, "success")

    def normalize_sql(sql):
        return ' '.join(sql.strip().split())


    def test_special_character_handling(self):
        input_data = "Robert'); DROP TABLE summarized;--"
        self.history_manager = UserHistoryManagement()
        self.history_manager.insertHistory(input_data, "summarized", "username")
        # Verify the sanitized input is handled correctly
        self.mock_cursor.execute.assert_called_with("""
            INSERT INTO summarized (input_text, summarized_text, user_id)
            VALUES (%s, %s, %s)
        """, (input_data, "summarized", "username"))

    def test_empty_history_retrieval(self):
        self.history_manager = UserHistoryManagement()
        self.mock_cursor.fetchall.return_value = []
        history = self.history_manager.retrieveHistory("new_user")
        self.assertEqual(history, [])
        self.mock_cursor.execute.assert_called_with(
            "SELECT id, input_text, summarized_text FROM summarized WHERE user_id=%s", ("new_user",)
        )

    def test_nonexistent_history_deletion(self):
        self.history_manager = UserHistoryManagement()
        self.mock_cursor.rowcount = 0
        status = self.history_manager.deleteHistory("username", "999")
        self.assertEqual(status, "failed: no matching entry found")

    def test_database_connection_failure(self):
        with patch('HistoryManagement.psycopg2.connect') as mock_connect:
            mock_connect.side_effect = Exception("Connection failed")
            with self.assertRaises(Exception):
                UserHistoryManagement()

if __name__ == '__main__':
    unittest.main()
